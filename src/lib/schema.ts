// Datos estructurados (JSON-LD / schema.org) centralizados y enlazados por @id.
//
// Enfoque de última generación: un solo grafo conectado por página. Las
// entidades base de la marca (Organization, WebSite, ProfessionalService y el
// logo como ImageObject) se declaran una vez y se referencian por @id desde
// cada WebPage, Service, BreadcrumbList, etc. Google consolida las referencias
// entre páginas, así que cada página queda autocontenida pero coherente.
//
// Uso:
//   scripts: [{ type: "application/ld+json", children: buildGraph(webPage({...}), service({...}), breadcrumb(...)) }]

const SITE = "https://www.prismadigital.io";

const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const BUSINESS_ID = `${SITE}/#business`;
const LOGO_ID = `${SITE}/#logo`;

const SAME_AS = [
  "https://www.instagram.com/prismadigital.io/",
  "https://www.facebook.com/share/1Fu2MFXigF/",
  "https://www.linkedin.com/in/prisma-digital-6b6b86202/",
];

const LOGO_URL = `${SITE}/Logo Prisma Digital blanco.webp`;
const EMAIL = "prismadigital.io@gmail.com";
const PHONE = "+56957151303";

type Node = Record<string, unknown>;

const logoNode: Node = {
  "@type": "ImageObject",
  "@id": LOGO_ID,
  url: LOGO_URL,
  contentUrl: LOGO_URL,
  width: 341,
  height: 279,
  caption: "Prisma Digital",
};

const organizationNode: Node = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Prisma Digital",
  legalName: "Prisma Digital",
  url: `${SITE}/`,
  logo: { "@id": LOGO_ID },
  image: { "@id": LOGO_ID },
  email: EMAIL,
  telephone: PHONE,
  slogan: "Menos ilusión, más acción",
  description:
    "Agencia de crecimiento digital para empresas consolidadas: integramos y medimos ecosistemas digitales para duplicar las ventas online.",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Concepción",
      addressRegion: "Biobío",
      addressCountry: "CL",
    },
  },
  knowsAbout: [
    "Digitalización de negocios físicos",
    "Ecosistema digital integrado",
    "Medición de eventos web y apps",
    "Reducción de CPA",
    "GA4 y Conversions API",
    "Publicidad en Meta Ads y Google Ads",
    "Embudos de venta",
  ],
  areaServed: { "@type": "Country", name: "Chile" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    email: EMAIL,
    contactType: "customer service",
    areaServed: "CL",
    availableLanguage: ["Spanish"],
  },
  sameAs: SAME_AS,
};

const websiteNode: Node = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: "Prisma Digital",
  description:
    "Modernizamos y medimos el ecosistema digital de empresas consolidadas para duplicar sus ventas online.",
  publisher: { "@id": ORG_ID },
  inLanguage: "es-CL",
};

// ProfessionalService es subtipo de LocalBusiness: conserva el SEO local
// (Concepción, Chile) y describe con precisión a una agencia de servicios.
const businessNode: Node = {
  "@type": "ProfessionalService",
  "@id": BUSINESS_ID,
  name: "Prisma Digital",
  image: { "@id": LOGO_ID },
  logo: { "@id": LOGO_ID },
  url: `${SITE}/`,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  currenciesAccepted: "CLP",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Concepción",
    addressRegion: "Biobío",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -36.8201,
    longitude: -73.0444,
  },
  areaServed: { "@type": "Country", name: "Chile" },
  parentOrganization: { "@id": ORG_ID },
  sameAs: SAME_AS,
  description:
    "Agencia de crecimiento digital en Concepción, Chile. Digitalizamos, promocionamos y optimizamos negocios con un sistema medible y rentable.",
};

/** WebPage enlazada al sitio y a la organización, con su imagen destacada. */
export function webPage(opts: {
  url: string;
  name: string;
  description: string;
  image: string;
  withBreadcrumb?: boolean;
}): Node {
  const node: Node = {
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: opts.image,
      width: 1200,
      height: 630,
    },
    inLanguage: "es-CL",
  };
  if (opts.withBreadcrumb) node.breadcrumb = { "@id": `${opts.url}#breadcrumb` };
  return node;
}

/** Migaja de pan de dos niveles: Inicio › {name}. */
export function breadcrumb(url: string, name: string): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}

/** Service con catálogo de ofertas (sub-servicios) provisto por la organización. */
export function service(opts: {
  url: string;
  serviceType: string;
  name: string;
  description: string;
  offers: string[];
}): Node {
  return {
    "@type": "Service",
    "@id": `${opts.url}#service`,
    serviceType: opts.serviceType,
    name: opts.name,
    description: opts.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Chile" },
    url: opts.url,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    },
  };
}

/** Migaja de pan de N niveles (p. ej. Inicio › Blog › Post). */
export function breadcrumbTrail(url: string, trail: { name: string; item: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.item,
    })),
  };
}

/** BlogPosting/Article completo para GEO y rich results de artículo. */
export function blogPosting(opts: {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  section: string;
  keywords: string[];
  wordCount?: number;
}): Node {
  return {
    "@type": "BlogPosting",
    "@id": `${opts.url}#article`,
    isPartOf: { "@id": `${SITE}/blog#blog` },
    mainEntityOfPage: { "@id": `${opts.url}#webpage` },
    headline: opts.headline,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    articleSection: opts.section,
    keywords: opts.keywords.join(", "),
    inLanguage: "es-CL",
    url: opts.url,
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
  };
}

/** FAQPage a partir de las preguntas del post (ideal para respuestas de IA). */
export function faqPage(url: string, faqs: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Nodo Blog (índice) con la lista de posts publicados. */
export function blogListing(
  posts: { url: string; title: string; datePublished: string; image: string }[],
): Node {
  return {
    "@type": "Blog",
    "@id": `${SITE}/blog#blog`,
    url: `${SITE}/blog`,
    name: "Blog de Prisma Digital",
    description:
      "Guías prácticas de marketing digital, medición, análisis, martech y SEO para empresas consolidadas.",
    publisher: { "@id": ORG_ID },
    inLanguage: "es-CL",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${p.url}#article`,
      headline: p.title,
      url: p.url,
      datePublished: p.datePublished,
      image: [p.image],
    })),
  };
}

/** Serializa el grafo: entidades base de marca + nodos propios de la página. */
export function buildGraph(...pageNodes: Node[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, businessNode, logoNode, ...pageNodes],
  });
}
