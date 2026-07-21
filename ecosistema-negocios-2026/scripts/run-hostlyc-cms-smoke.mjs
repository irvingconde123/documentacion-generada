const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000/v1";
const TENANT_SLUG = process.env.TENANT_SLUG ?? "hostlyc-clon";
const ACTOR_ID = process.env.ACTOR_ID ?? "user_irving";
const ACTOR_EMAIL = process.env.ACTOR_EMAIL ?? "irving.condem@gmail.com";
const CMS_ORIGIN = process.env.CMS_ORIGIN ?? "http://localhost:4200";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${path} -> ${response.status}: ${text}`);
  }
  return body;
}

function suffix() {
  return new Date().toISOString().replace(/\D/g, "").slice(0, 14);
}

async function main() {
  const stamp = suffix();
  const createdUsers = [];

  await request(`/cms/${TENANT_SLUG}/audit-reports/events/login`, {
    method: "POST",
    body: JSON.stringify({ email: ACTOR_EMAIL, status: "success" }),
  });
  await request(`/cms/${TENANT_SLUG}/audit-reports/events/login`, {
    method: "POST",
    body: JSON.stringify({
      email: `tester.${stamp}@example.test`,
      status: "failed",
      reason: "prueba de contraseña incorrecta del tester",
    }),
  });

  for (const index of [1, 2]) {
    const user = await request(`/cms/${TENANT_SLUG}/users`, {
      method: "POST",
      body: JSON.stringify({
        email: `hostlyc.tester.${stamp}.${index}@example.test`,
        name: `Tester Hostlyc ${index}`,
        role: index === 1 ? "editor" : "admin",
        avatarUrl: `https://placehold.co/256x256/png?text=T${index}`,
        requestedByUserId: ACTOR_ID,
      }),
    });
    createdUsers.push(user);
  }

  for (const [index, user] of createdUsers.entries()) {
    await request(`/cms/${TENANT_SLUG}/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: `${user.name} Actualizado`,
        role: user.role,
        avatarUrl: `https://placehold.co/256x256/png?text=U${index + 1}`,
        status: "active",
        requestedByUserId: ACTOR_ID,
      }),
    });
    await request(`/cms/${TENANT_SLUG}/users/${user.id}/password/temporary`, {
      method: "POST",
      body: JSON.stringify({ requestedByUserId: ACTOR_ID, origin: CMS_ORIGIN }),
    });
  }

  await request(`/cms/${TENANT_SLUG}/users/${createdUsers[0].id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: `${createdUsers[0].name} Bloqueado`,
      role: createdUsers[0].role,
      avatarUrl: createdUsers[0].avatarUrl,
      status: "inactive",
      requestedByUserId: ACTOR_ID,
    }),
  });

  const mediaItems = [];
  mediaItems.push(
    await request(`/cms/${TENANT_SLUG}/media`, {
      method: "POST",
      body: JSON.stringify({
        title: "Hero Hostlyc prueba",
        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        altText: "Equipo trabajando en una oficina moderna",
        type: "image",
        status: "active",
        tags: ["hostlyc", "hero", "prueba"],
        requestedByUserId: ACTOR_ID,
      }),
    }),
  );
  mediaItems.push(
    await request(`/cms/${TENANT_SLUG}/media`, {
      method: "POST",
      body: JSON.stringify({
        title: "PDF descargable prueba",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        altText: "PDF de prueba descargable",
        type: "document",
        status: "active",
        tags: ["hostlyc", "pdf", "descarga"],
        requestedByUserId: ACTOR_ID,
      }),
    }),
  );
  await request(`/cms/${TENANT_SLUG}/media/${mediaItems[0].id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: "Hero Hostlyc prueba actualizada",
      url: mediaItems[0].url,
      altText: "Imagen principal actualizada para prueba Hostlyc",
      type: "image",
      status: "active",
      tags: ["hostlyc", "hero", "actualizada"],
      requestedByUserId: ACTOR_ID,
    }),
  });

  const site = await request(`/public/${TENANT_SLUG}/site`);
  const nextSite = {
    ...site,
    pages: site.pages.map((page) =>
      page.slug === "home"
        ? {
            ...page,
            title: "Tu negocio, visible y creciendo.",
            description: "Prueba real de edición desde CMS para clonar Hostlyc.",
            blocks: page.blocks.map((block, index) =>
              index === 0
                ? {
                    ...block,
                    title: "Tu negocio, visible y creciendo.",
                    body: "Somos una agencia digital que crea páginas web, tiendas en línea y presencia digital.",
                    settings: {
                      ...block.settings,
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
                      imageUrl: mediaItems[0].url,
                    },
                  }
                : block,
            ),
          }
        : page,
    ),
    navigation: [
      ...site.navigation,
      {
        id: `nav_pdf_${stamp}`,
        label: "PDF prueba",
        path: mediaItems[1].url,
        pageSlug: "home",
        linkType: "download",
        visible: true,
        order: site.navigation.length + 1,
        target: "blank",
      },
    ],
  };

  await request(`/public/${TENANT_SLUG}/cms/site`, {
    method: "PUT",
    body: JSON.stringify({
      tenantSlug: TENANT_SLUG,
      pages: nextSite.pages,
      navigation: nextSite.navigation,
      requestedBy: ACTOR_EMAIL,
    }),
  });

  await request(`/public/${TENANT_SLUG}/cms/design`, {
    method: "PUT",
    body: JSON.stringify({
      tenantSlug: TENANT_SLUG,
      brandName: "Hostlyc",
      primaryColor: "#111111",
      accentColor: "#ef233c",
      fontFamily: "Inter",
      requestedBy: ACTOR_EMAIL,
    }),
  });

  await request(`/sync/${TENANT_SLUG}/operations`, {
    method: "POST",
    body: JSON.stringify({
      operationId: `sync_hostlyc_${stamp}`,
      tenantSlug: TENANT_SLUG,
      clientCreatedAt: new Date().toISOString(),
      mutations: [
        {
          mutationId: `mutation_hostlyc_${stamp}_1`,
          tenantSlug: TENANT_SLUG,
          entityName: "cms_page",
          operation: "update",
          payload: { reason: "smoke-test" },
          createdAt: new Date().toISOString(),
        },
      ],
    }),
  });

  const reportPreview = await request(`/cms/${TENANT_SLUG}/audit-reports/preview`, {
    method: "POST",
    body: JSON.stringify({
      requestedByUserId: ACTOR_ID,
      recipientEmail: ACTOR_EMAIL,
    }),
  });

  const events = await request(`/cms/${TENANT_SLUG}/audit-reports/recent?requestedByUserId=${ACTOR_ID}`);
  const backups = await request(`/cms/${TENANT_SLUG}/backups/recent?requestedByUserId=${ACTOR_ID}`);

  console.log(
    JSON.stringify(
      {
        tenantSlug: TENANT_SLUG,
        createdUsers: createdUsers.map((user) => ({ id: user.id, email: user.email })),
        mediaItems: mediaItems.map((item) => ({ id: item.id, title: item.title, type: item.type })),
        auditEvents: events.events?.length ?? 0,
        backups: backups.length,
        reportPreview: reportPreview.artifacts ?? reportPreview.message,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
