import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { Pool } = require("../repos/api/node_modules/pg");

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const apiEnvPath = path.join(workspaceRoot, "repos", "api", ".env");
const cmsStatePath = path.join(workspaceRoot, "repos", "cms", ".local-data", "cms-state.json");

const args = parseArgs(process.argv.slice(2));
const tenantSlug = normalizeSlug(args.slug ?? args._[0] ?? "hostlyc-clon");
const businessName = args.name ?? (args._.slice(1).join(" ") || "Hostlyc Clone Test");
const adminUserId = args.adminUserId ?? "user_irving";
const adminEmail = args.adminEmail ?? "irving.condem@gmail.com";
const apiBaseUrl = args.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/v1";

const site = buildStarterSite(tenantSlug, businessName);

await updateLocalCmsState();
await updateDatabase();
await publishThroughApiIfAvailable();

console.log(JSON.stringify({
  tenantSlug,
  businessName,
  adminUserId,
  cmsUrl: "http://localhost:4200",
  landingUrl: "http://localhost:3101",
  apiSiteUrl: `${apiBaseUrl}/public/${tenantSlug}/site`,
}, null, 2));

function parseArgs(values) {
  const parsed = { _: [] };
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      parsed._.push(value);
      continue;
    }
    const key = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }
    parsed[key] = next;
    index += 1;
  }
  return parsed;
}

function normalizeSlug(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "landing-nueva";
}

async function updateLocalCmsState() {
  let state;
  try {
    state = JSON.parse(await readFile(cmsStatePath, "utf8"));
  } catch {
    state = {
      businesses: [],
      users: [],
      passwordResetRequests: [],
      media: {},
      pages: {},
      sitePages: {},
      navigation: {},
      designs: {},
      auditRequests: [],
    };
  }

  state.businesses = upsertByKey(state.businesses ?? [], "slug", {
    slug: tenantSlug,
    name: businessName,
    description: `Landing nueva para prueba real de clonacion CMS: ${businessName}.`,
  });

  const users = state.users?.length ? state.users : [];
  const existingUser = users.find((user) => user.id === adminUserId || user.email === adminEmail);
  if (existingUser) {
    existingUser.businessSlugs = unique([...(existingUser.businessSlugs ?? []), tenantSlug]);
    existingUser.role = "admin";
    existingUser.status = "active";
  } else {
    users.push({
      id: adminUserId,
      email: adminEmail,
      name: "Irving Conde",
      role: "admin",
      avatarUrl: "",
      status: "active",
      password: "Temporal2026!",
      businessSlugs: [tenantSlug],
    });
  }
  state.users = users;
  state.pages = { ...(state.pages ?? {}), [tenantSlug]: site.pages[0] };
  state.sitePages = { ...(state.sitePages ?? {}), [tenantSlug]: site.pages };
  state.navigation = { ...(state.navigation ?? {}), [tenantSlug]: site.navigation };
  state.designs = { ...(state.designs ?? {}), [tenantSlug]: site.design };
  state.media = {
    ...(state.media ?? {}),
    [tenantSlug]: [
      {
        id: `media_${tenantSlug}_hero`,
        tenantSlug,
        title: "Imagen principal pendiente",
        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        altText: "Equipo digital trabajando en una oficina",
        type: "image",
        status: "active",
        tags: ["hero", "hostlyc"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };
  state.auditRequests = state.auditRequests ?? [];

  await mkdir(path.dirname(cmsStatePath), { recursive: true });
  await writeFile(cmsStatePath, JSON.stringify(state, null, 2), "utf8");
}

async function updateDatabase() {
  const connectionString = process.env.DATABASE_URL ?? (await readDatabaseUrlFromApiEnv());
  if (!connectionString) {
    return;
  }

  const pool = new Pool({
    connectionString,
    ssl: shouldUseSsl(connectionString),
  });

  try {
    await pool.query(
      `create table if not exists public_site_mirrors (
        tenant_slug text primary key,
        source text not null default 'published',
        pages jsonb not null,
        navigation jsonb not null,
        design jsonb not null,
        updated_at timestamptz not null default now(),
        updated_by text
      )`,
    );
    await pool.query(
      `create table if not exists cms_users (
        id text primary key,
        email text not null unique,
        display_name text not null,
        role text not null,
        avatar_url text,
        status text not null default 'active',
        requires_password_change boolean not null default false,
        business_slugs text[] not null,
        password_secret text not null,
        temporary_password text,
        temporary_password_expires_at timestamptz,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )`,
    );
    await pool.query(
      `insert into cms_users
        (id, email, display_name, role, avatar_url, status, requires_password_change, business_slugs, password_secret, created_at, updated_at)
       values ($1, $2, 'Irving Conde', 'admin', '', 'active', false, $3::text[], 'Temporal2026!', now(), now())
       on conflict (id) do update set
        business_slugs = (
          select array(select distinct unnest(cms_users.business_slugs || excluded.business_slugs))
        ),
        role = 'admin',
        status = 'active',
        updated_at = now()`,
      [adminUserId, adminEmail, [tenantSlug]],
    );
    await pool.query(
      `insert into public_site_mirrors
        (tenant_slug, source, pages, navigation, design, updated_at, updated_by)
       values ($1, 'published', $2::jsonb, $3::jsonb, $4::jsonb, now(), $5)
       on conflict (tenant_slug) do update set
        source = excluded.source,
        pages = excluded.pages,
        navigation = excluded.navigation,
        design = excluded.design,
        updated_at = now(),
        updated_by = excluded.updated_by`,
      [
        tenantSlug,
        JSON.stringify(site.pages),
        JSON.stringify(site.navigation),
        JSON.stringify(site.design),
        adminEmail,
      ],
    );
  } finally {
    await pool.end();
  }
}

async function publishThroughApiIfAvailable() {
  try {
    await fetch(`${apiBaseUrl}/public/${tenantSlug}/cms/site`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenantSlug,
        pages: site.pages,
        navigation: site.navigation,
        requestedBy: adminEmail,
      }),
    });
    await fetch(`${apiBaseUrl}/public/${tenantSlug}/cms/design`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...site.design, requestedBy: adminEmail }),
    });
  } catch {
    // API can be started later; DB/local state were already prepared.
  }
}

async function readDatabaseUrlFromApiEnv() {
  try {
    const env = await readFile(apiEnvPath, "utf8");
    const match = /^DATABASE_URL=(.+)$/m.exec(env) ?? /^DATABASE_OPERATIONAL_URL=(.+)$/m.exec(env);
    return match?.[1]?.trim().replace(/^"|"$/g, "");
  } catch {
    return "";
  }
}

function shouldUseSsl(connectionString) {
  return !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1");
}

function upsertByKey(items, key, item) {
  const next = items.filter((candidate) => candidate[key] !== item[key]);
  next.push(item);
  return next;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function buildStarterSite(slug, brandName) {
  const updatedAt = new Date().toISOString();
  const publicBrandName = slug === "hostlyc-clon" ? "Hostlyc" : brandName;
  const primaryColor = slug === "hostlyc-clon" ? "#111111" : "#111827";
  const accentColor = slug === "hostlyc-clon" ? "#ef233c" : "#f5b942";
  const pages = [
    {
      id: `page_${slug}_home`,
      tenantSlug: slug,
      slug: "home",
      title: "Tu negocio, visible y creciendo.",
      description: "Landing comercial para presentar servicios digitales con claridad.",
      seo: {
        seoTitle: `${publicBrandName} | Prueba CMS`,
        seoDescription: "Prueba real para medir si el CMS permite clonar una landing comercial.",
      },
      visibility: "public",
      updatedAt,
      blocks: [
        {
          id: "hero_hostlyc",
          kind: "hero",
          title: "Tu negocio, visible y creciendo.",
          body: "Somos una agencia digital que crea páginas web, tiendas en línea y presencia digital.",
          settings: {
            variant: "hostlycHero",
            layout: "centered",
            highlight: "visible",
            eyebrow: "Agencia digital en México",
            navSubtitle: "Agencia digital",
            navCtaLabel: "Hablemos",
            navCtaHref: "#contacto",
            ctaLabel: "Quiero crecer en digital",
            secondaryCtaLabel: "Ver proyectos",
            secondaryCtaHref: "#proyectos",
            imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
            items: ["Páginas web profesionales", "Tiendas en línea", "Posicionamiento en Google"],
          },
          order: 1,
        },
        {
          id: "services_hostlyc",
          kind: "features",
          title: "Tu negocio merece una presencia que se note y se entienda.",
          body: "Soluciones pensadas para que tu negocio se vea profesional, se entienda rápido y pueda convertir visitas en conversaciones.",
          settings: {
            variant: "hostlycServices",
            itemCtaLabel: "Ver servicio",
            items: [
              "Páginas web profesionales|Una página clara, memorable y preparada para convertir visitas.",
              "Tiendas en línea|Tu catálogo abierto todo el día.",
              "Posicionamiento en Google|Una base preparada para aparecer cuando te buscan.",
              "Presencia en redes sociales|Mensajes que conectan publicaciones con ventas.",
              "Identidad de marca|Una identidad reconocible en cada punto de contacto.",
              "Herramientas para tu negocio|Soluciones para ordenar clientes, pedidos y tareas.",
            ],
          },
          order: 2,
        },
        {
          id: "projects_hostlyc",
          kind: "gallery",
          title: "Trabajo reciente",
          body: "Ejemplos de cómo una presencia digital clara puede ordenar tu oferta y generar confianza.",
          settings: {
            role: "projects",
            variant: "hostlycProjects",
            items: [
              "Tienda de productos|Catálogo claro, pagos y una experiencia preparada para vender.|Ecommerce",
              "Presencia corporativa|Página profesional para explicar servicios y generar confianza.|Web",
              "Lanzamiento de servicio|Landing enfocada en comunicar una oferta y captar prospectos.|Landing",
            ],
            images: [
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
            ],
          },
          order: 3,
        },
        {
          id: "about_hostlyc",
          kind: "text",
          title: "Tu página debe sentirse tan profesional como el negocio que construyes cada día.",
          body: "Nos involucramos para entender lo que vendes y convertir esa claridad en presencia digital.",
          settings: {
            variant: "agency-about",
            backgroundColor: "#173f35",
            bullets: [
              "Claridad antes que ruido",
              "Pensado para tus clientes",
              "Cerca durante el camino",
            ],
          },
          order: 4,
        },
        {
          id: "process_hostlyc",
          kind: "text",
          title: "Un camino claro desde la primera conversación hasta tu nueva página.",
          body: "El CMS debe permitir representar pasos y mover esta sección al final si se agrega por error antes.",
          settings: {
            variant: "process",
            layout: "timeline",
            items: [
              "Escuchamos tu negocio|Entendemos qué vendes y qué necesitas resolver primero.",
              "Damos forma a la idea|Ordenamos la información y definimos la experiencia.",
              "Construimos tu página|Convertimos la propuesta en una página rápida y adaptable.",
              "Publicamos y acompañamos|Ponemos todo en línea y seguimos cerca.",
            ],
          },
          order: 5,
        },
        {
          id: "faq_hostlyc",
          kind: "text",
          title: "Lo importante, antes de empezar.",
          body: "Respuestas rápidas para saber cómo empezar y qué esperar del proceso.",
          settings: {
            variant: "faq",
            layout: "accordion",
            items: [
              "¿Trabajan con negocios que aún no tienen una página web?|Sí. Podemos partir desde cero.",
              "¿Pueden mejorar un sitio que ya existe?|Sí. Revisamos qué conviene conservar.",
              "¿Cuánto tarda un proyecto?|Depende del alcance.",
              "¿El sitio queda preparado para Google?|Sí. Cuidamos estructura y metadatos.",
            ],
          },
          order: 6,
        },
        {
          id: "contact_hostlyc",
          kind: "contactForm",
          title: "Tu siguiente etapa digital puede empezar con una conversación clara.",
          body: "Cuéntanos qué quieres mejorar.",
          settings: {
            eyebrow: "Contacto",
            note: "Cuéntanos qué quieres mejorar. Te responderemos con una ruta clara, sin palabras técnicas.",
            submitLabel: "Enviar propuesta",
          },
          order: 7,
        },
        {
          id: "footer_hostlyc",
          kind: "text",
          title: "Hostlyc",
          body: "Soluciones digitales claras para negocios que quieren crecer con una base profesional.",
          settings: {
            variant: "footer",
            subtitle: "Agencia digital",
            items: ["Explorar|Servicios|Proyectos|Nosotros|Proceso|Contacto", "Contacto|hola@hostlyc.com|México"],
          },
          order: 8,
        },
      ],
    },
  ];

  return {
    tenantSlug: slug,
    source: "published",
    pages,
    navigation: [
      { id: `nav_${slug}_home`, label: "Inicio", path: "/", pageSlug: "home", linkType: "page", visible: true, order: 1, target: "self" },
      { id: `nav_${slug}_servicios`, label: "Servicios", path: "#servicios", pageSlug: "home", linkType: "page", visible: true, order: 2, target: "self" },
      { id: `nav_${slug}_proyectos`, label: "Proyectos", path: "#proyectos", pageSlug: "home", linkType: "page", visible: true, order: 3, target: "self" },
      { id: `nav_${slug}_nosotros`, label: "Nosotros", path: "#nosotros", pageSlug: "home", linkType: "page", visible: true, order: 4, target: "self" },
      { id: `nav_${slug}_proceso`, label: "Proceso", path: "#proceso", pageSlug: "home", linkType: "page", visible: true, order: 5, target: "self" },
      { id: `nav_${slug}_contacto`, label: "Contacto", path: "#contacto", pageSlug: "home", linkType: "page", visible: true, order: 6, target: "self" },
    ],
    design: {
      tenantSlug: slug,
      brandName: publicBrandName,
      primaryColor,
      accentColor,
      fontFamily: "Inter",
      updatedAt,
    },
    updatedAt,
  };
}
