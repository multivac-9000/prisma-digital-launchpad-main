// Contenido del blog de Prisma Digital (data-driven).
//
// Cada post se modela como bloques estructurados en vez de HTML libre. Esto
// permite: (1) renderizar con estilo consistente, (2) generar automáticamente
// el schema BlogPosting + FAQPage, y (3) optimizar para GEO (posicionamiento en
// motores de IA): encabezados en forma de pregunta, respuestas autocontenidas,
// listas y tablas fáciles de extraer, y una caja de "puntos clave" arriba.
//
// Para publicar un post nuevo: agrega su portada en scripts/generate-blog-images.mjs,
// corre el script y añade el objeto Post aquí. Nada más.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string };

export type FAQ = { q: string; a: string };

export type Category = {
  slug: string;
  label: string;
  description: string;
  accent: "cyan" | "magenta" | "red";
  icon: string; // clave de icono lucide (se mapea en el componente)
};

export type Post = {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  coverAlt: string;
  author: string;
  datePublished: string; // ISO (YYYY-MM-DD)
  dateModified: string;
  readingMinutes: number;
  keywords: string[];
  tldr: string[]; // "Puntos clave" — bullets para lectura rápida y GEO
  body: Block[];
  faq: FAQ[];
};

export const SITE = "https://www.prismadigital.io";
export const AUTHOR = "Equipo Prisma Digital";

export const categories: Category[] = [
  {
    slug: "herramientas-digitales",
    label: "Herramientas digitales",
    description: "Software y plataformas para operar, vender y crecer.",
    accent: "cyan",
    icon: "Wrench",
  },
  {
    slug: "buenas-practicas",
    label: "Buenas prácticas",
    description: "Estándares para trabajar con orden, calidad y datos confiables.",
    accent: "magenta",
    icon: "CheckCircle2",
  },
  {
    slug: "tips-marketing",
    label: "Tips de Marketing",
    description: "Tácticas para atraer, convertir y retener mejor.",
    accent: "red",
    icon: "Megaphone",
  },
  {
    slug: "desarrollo-seo",
    label: "Tips de desarrollo y SEO",
    description: "Webs rápidas, indexables y bien posicionadas.",
    accent: "cyan",
    icon: "Code2",
  },
  {
    slug: "tipos-de-graficos",
    label: "Tipos de gráficos",
    description: "Cómo visualizar datos para decidir mejor.",
    accent: "magenta",
    icon: "BarChart3",
  },
  {
    slug: "analisis-digital",
    label: "Análisis digital",
    description: "Leer los datos para convertirlos en decisiones.",
    accent: "red",
    icon: "LineChart",
  },
  {
    slug: "ratios-y-tasas",
    label: "Ratios y tasas",
    description: "Las métricas que revelan la salud de tu negocio.",
    accent: "cyan",
    icon: "Percent",
  },
  {
    slug: "tips-de-medicion",
    label: "Tips de medición",
    description: "Medir bien lo que de verdad importa.",
    accent: "magenta",
    icon: "Gauge",
  },
  {
    slug: "martech",
    label: "Martech",
    description: "Marketing y tecnología, integrados de punta a punta.",
    accent: "red",
    icon: "Layers",
  },
];

export const posts: Post[] = [
  // ─────────────────────────────────────────────────────────── Herramientas
  {
    slug: "herramientas-digitales-imprescindibles",
    categorySlug: "herramientas-digitales",
    title: "12 herramientas digitales imprescindibles para un negocio consolidado en 2026",
    excerpt:
      "Una caja de herramientas mínima y bien integrada para vender, medir y operar sin fricción — pensada para negocios con trayectoria, no para partir de cero.",
    coverAlt:
      "Portada del artículo sobre las 12 herramientas digitales imprescindibles para un negocio consolidado, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-07-01",
    dateModified: "2026-07-10",
    readingMinutes: 8,
    keywords: [
      "herramientas digitales",
      "stack digital",
      "software para empresas",
      "martech",
      "CRM",
      "GA4",
    ],
    tldr: [
      "Un negocio con trayectoria no necesita más herramientas, necesita las correctas y bien conectadas.",
      "Prioriza cuatro frentes: sitio y venta, medición, relación con clientes (CRM) y automatización.",
      "Regla de oro: si una herramienta no se integra con las demás, genera trabajo manual y datos sucios.",
      "Empieza por la medición (GA4 + Google Tag Manager): sin datos confiables, todo lo demás decide a ciegas.",
    ],
    body: [
      {
        type: "p",
        text: "Si tu empresa ya vende y tiene años de trayectoria, tu problema no es la falta de herramientas: es que probablemente tienes demasiadas y ninguna se habla con la otra. La digitalización efectiva no consiste en sumar apps, sino en armar un sistema donde cada pieza aporta un dato y ese dato viaja al resto. Esta es la caja de herramientas mínima que recomendamos, ordenada por frente de trabajo.",
      },
      { type: "h2", text: "¿Qué hace 'imprescindible' a una herramienta digital?" },
      {
        type: "p",
        text: "No es la popularidad ni el precio. Una herramienta merece estar en tu stack si cumple estos criterios:",
      },
      {
        type: "ul",
        items: [
          "**Se integra** con el resto vía API o conectores nativos (no es una isla).",
          "**Te deja exportar tus datos** cuando quieras: tus datos son tuyos, no rehenes del proveedor.",
          "**Reduce trabajo manual**, no lo aumenta con tareas de copiar y pegar.",
          "**Es medible**: puedes saber si está generando retorno o solo costo.",
        ],
      },
      { type: "h2", text: "Las 12 herramientas, por frente de trabajo" },
      {
        type: "table",
        headers: ["Categoría", "Para qué sirve", "Ejemplos"],
        rows: [
          ["Sitio web / CMS", "Publicar y editar tu web sin depender de un dev para todo", "WordPress, Webflow, sitios a medida"],
          ["E-commerce", "Vender online con carro y checkout", "Shopify, WooCommerce"],
          ["Pasarela de pago", "Cobrar en línea de forma segura", "Transbank, Mercado Pago, Stripe"],
          ["Gestión de stock / ERP", "Inventario sincronizado en tienda y online", "Bsale, Defontana"],
          ["CRM", "Centralizar contactos, oportunidades y seguimiento", "HubSpot, Pipedrive"],
          ["Email marketing / automation", "Nutrir y reactivar clientes", "Brevo, Mailchimp"],
          ["WhatsApp Business API", "Atención y ventas conversacionales medibles", "Twilio, 360dialog"],
          ["Analítica web", "Medir comportamiento y conversiones", "Google Analytics 4"],
          ["Gestor de etiquetas", "Desplegar el tracking sin tocar código", "Google Tag Manager (web y server-side)"],
          ["Dashboards / BI", "Ver tus KPIs en un tablero vivo", "Looker Studio, Power BI"],
          ["Publicidad", "Captar demanda con pauta medible", "Meta Ads, Google Ads"],
          ["Productividad", "Tareas, archivos y firma electrónica", "Google Workspace, Notion, DocuSign"],
        ],
      },
      { type: "h2", text: "¿Cómo elegir sin terminar con 30 apps que no se hablan?" },
      {
        type: "ol",
        items: [
          "Parte por el problema, no por la herramienta: define qué decisión no puedes tomar hoy por falta de datos.",
          "Elige primero la capa de [medición (GA4 + GTM)](/blog/medicion-de-eventos-sin-perder-datos): es la que le da sentido a todo lo demás.",
          "Verifica integraciones antes de contratar: ¿se conecta con tu CRM y tu e-commerce?",
          "Consolida: si dos herramientas hacen lo mismo, quédate con la que se integre mejor.",
          "Documenta quién usa qué y para qué. Una herramienta sin dueño es una suscripción muerta.",
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "El valor no está en la herramienta, está en la integración. Diez herramientas conectadas valen más que treinta aisladas.",
      },
    ],
    faq: [
      {
        q: "¿Cuántas herramientas digitales necesita una empresa consolidada?",
        a: "Menos de las que probablemente tiene. La mayoría opera bien con 10 a 15 herramientas correctamente integradas que cubran sitio y venta, medición, CRM y automatización. El objetivo no es cantidad, sino que los datos fluyan entre ellas sin trabajo manual.",
      },
      {
        q: "¿Por dónde conviene empezar la digitalización?",
        a: "Por la medición. Instalar Google Analytics 4 y Google Tag Manager primero permite que cada herramienta que agregues después se evalúe con datos reales, en vez de decidir por intuición.",
      },
      {
        q: "¿Vale la pena pagar por herramientas o basta con las gratuitas?",
        a: "GA4, Google Tag Manager y Looker Studio son gratuitos y de nivel profesional. Conviene pagar cuando una herramienta te ahorra horas de trabajo manual o te da un dato que no puedes obtener de otra forma, como un CRM o la WhatsApp Business API.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── Buenas prácticas
  {
    slug: "buenas-practicas-higiene-de-datos",
    categorySlug: "buenas-practicas",
    title: "Higiene de datos: 8 buenas prácticas para decisiones que no fallan",
    excerpt:
      "Datos sucios igual a decisiones caras. Ocho hábitos para que tu información sea confiable, comparable y accionable.",
    coverAlt:
      "Portada del artículo sobre buenas prácticas de higiene de datos para tomar mejores decisiones, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-06-24",
    dateModified: "2026-07-10",
    readingMinutes: 7,
    keywords: [
      "higiene de datos",
      "calidad de datos",
      "buenas prácticas",
      "gobernanza de datos",
      "UTM",
    ],
    tldr: [
      "La higiene de datos es el conjunto de hábitos que mantienen tu información limpia, consistente y confiable.",
      "El 80% de los problemas de reporte no son del dashboard: son datos mal capturados en el origen.",
      "Una convención de nombres (UTM, eventos, campañas) es la práctica que más errores previene.",
      "Define una única fuente de verdad por métrica para dejar de discutir 'de qué número hablamos'.",
    ],
    body: [
      {
        type: "p",
        text: "Puedes tener el mejor dashboard del mundo, pero si los datos que lo alimentan están sucios, solo estarás tomando malas decisiones más rápido. La higiene de datos es la disciplina —poco glamorosa pero decisiva— de mantener la información limpia desde el momento en que se captura, y es la base de todo [análisis digital](/blog/analisis-digital-datos-a-decisiones) confiable. Estas son las ocho prácticas que separan a los equipos que confían en sus números de los que viven 'peleándose con el Excel'.",
      },
      { type: "h2", text: "¿Qué es la higiene de datos y por qué importa?" },
      {
        type: "p",
        text: "Higiene de datos es el conjunto de procesos que aseguran que tus datos sean correctos, completos, consistentes y actualizados. Importa porque cada decisión comercial —cuánto invertir en pauta, qué producto empujar, a qué cliente reactivar— se apoya en esos datos. Un dato mal capturado no se nota hasta que ya tomaste la decisión equivocada.",
      },
      { type: "h2", text: "Las 8 buenas prácticas" },
      {
        type: "ol",
        items: [
          "**Convención de nombres:** define un formato único para UTMs, eventos y campañas. `meta_prospecting_junio` siempre, nunca `Meta Junio` un día y `FB-junio` al otro.",
          "**Validación en el origen:** obliga formatos en formularios (email válido, teléfono con largo correcto). Es más barato prevenir que limpiar.",
          "**Una única fuente de verdad:** decide qué herramienta manda para cada métrica (ventas: el ERP; sesiones: GA4) y no la contradigas.",
          "**Deduplicación:** un mismo cliente no puede existir tres veces en el CRM. Define reglas de fusión.",
          "**Documentación:** un diccionario de datos que explique qué significa cada campo y evento. Si solo vive en la cabeza de una persona, no existe.",
          "**Gobernanza:** define quién puede crear campos, eventos y campañas. El caos nace cuando todos crean lo que quieren.",
          "**Retención y privacidad:** guarda solo lo que necesitas, por el tiempo que corresponde, cumpliendo la normativa de datos personales.",
          "**Auditoría periódica:** revisa una vez al mes que el tracking siga funcionando. Las cosas se rompen en silencio.",
        ],
      },
      { type: "h2", text: "Errores comunes (y cómo se ven en tus reportes)" },
      {
        type: "table",
        headers: ["Error", "Cómo se manifiesta", "Solución"],
        rows: [
          ["UTMs inconsistentes", "La misma campaña aparece dividida en 5 filas", "Plantilla de UTM obligatoria"],
          ["Doble conteo de conversiones", "Ventas infladas vs. el ERP", "Deduplicar y definir fuente de verdad"],
          ["Eventos sin nomenclatura", "Nadie entiende qué mide 'evento_3'", "Diccionario de eventos"],
          ["Datos personales sin control", "Riesgo legal y multas", "Política de retención y consentimiento"],
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "La calidad de tus decisiones nunca será mayor que la calidad de tus datos. Invertir una hora en higiene de datos ahorra diez de discusión.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la higiene de datos?",
        a: "Es el conjunto de hábitos y procesos que mantienen los datos de una empresa limpios, consistentes, completos y actualizados desde su origen, para que las decisiones basadas en ellos sean confiables.",
      },
      {
        q: "¿Cuál es la práctica de higiene de datos más importante?",
        a: "Establecer una convención de nombres consistente para campañas, UTMs y eventos. Es la que previene la mayor cantidad de errores de atribución y de reporte, porque evita que un mismo elemento aparezca fragmentado en los datos.",
      },
      {
        q: "¿Cada cuánto se deben auditar los datos?",
        a: "Al menos una vez al mes para el tracking crítico (conversiones, eventos de venta) y ante cada cambio importante en el sitio o en las campañas. El tracking se rompe en silencio, así que la revisión periódica es la única forma de detectarlo a tiempo.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── Tips Marketing
  {
    slug: "tips-marketing-bajar-cpa",
    categorySlug: "tips-marketing",
    title: "7 tips de marketing para bajar tu CPA sin bajar tus ventas",
    excerpt:
      "El costo por adquisición sube cuando la señal de conversión es pobre. Siete tácticas medibles para pagar menos por cada cliente sin sacrificar volumen.",
    coverAlt:
      "Portada del artículo con 7 tips de marketing para reducir el CPA sin bajar las ventas, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-07-08",
    dateModified: "2026-07-10",
    readingMinutes: 7,
    keywords: ["CPA", "reducir CPA", "tips de marketing", "Meta Ads", "Google Ads", "ROAS"],
    tldr: [
      "El CPA (costo por adquisición) sube casi siempre por una razón: la plataforma no recibe buena señal de tus conversiones.",
      "Mejorar la medición (CAPI, server-side) suele bajar el CPA más que cambiar creatividades.",
      "Segmenta por valor de cliente, no solo por volumen de leads.",
      "Una landing 1 segundo más rápida puede mejorar la conversión de forma medible.",
    ],
    body: [
      {
        type: "p",
        text: "Cuando el CPA sube mes a mes, el reflejo natural es cambiar las imágenes del anuncio. Pero en la mayoría de los casos el problema no está en la creatividad, sino en la señal: si Meta o Google no saben con precisión quién convirtió, su algoritmo optimiza a ciegas y tú pagas la cuenta. Estos siete tips atacan la causa, no el síntoma.",
      },
      { type: "h2", text: "¿Por qué sube el CPA?" },
      {
        type: "p",
        text: "El CPA es cuánto pagas, en promedio, por cada conversión. Sube cuando la plataforma publicitaria optimiza con datos incompletos: bloqueo de cookies, navegadores con ITP, AdBlockers y consentimiento mal implementado hacen que se pierda entre un 10% y un 30% de las conversiones. Menos señal significa peor optimización y, por lo tanto, CPA más alto. Lo vemos en detalle en [medición de eventos sin perder datos](/blog/medicion-de-eventos-sin-perder-datos).",
      },
      { type: "h2", text: "Los 7 tips" },
      {
        type: "ol",
        items: [
          "**Recupera la señal con Conversions API (CAPI) y server-side.** Es, con diferencia, lo que más baja el CPA: le devuelves a la plataforma las conversiones que el navegador perdía.",
          "**Segmenta por valor, no por volumen.** Optimiza hacia el evento de compra o de lead calificado, no hacia clics o leads baratos que no compran.",
          "**Envía eventos de calidad de lead.** Marca cuáles leads avanzaron en el embudo para que el algoritmo aprenda a buscar más como esos.",
          "**Acelera la landing.** Cada segundo de carga extra cuesta conversiones. Optimiza imágenes, usa carga diferida y mide con datos reales.",
          "**Usa exclusiones.** No pagues por audiencias que ya son clientes o que nunca convertirán; libera presupuesto para las que sí.",
          "**Estructura el presupuesto por objetivo,** no por canal de moda. Cada peso debe perseguir una conversión medible.",
          "**Mide incrementalidad.** Antes de escalar, confirma que la campaña genera ventas que no habrían ocurrido igual sin ella.",
        ],
      },
      { type: "h2", text: "El impacto de recuperar la señal" },
      {
        type: "table",
        headers: ["Escenario", "Conversiones detectadas", "Efecto en el CPA"],
        rows: [
          ["Solo píxel de navegador", "70–90% del real", "CPA aparente más alto y peor optimización"],
          ["Píxel + Conversions API", "95–99% del real", "Mejor aprendizaje del algoritmo y CPA más bajo"],
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "Antes de cambiar el anuncio, revisa la medición. Un CPA alto suele ser un problema de datos disfrazado de problema creativo.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el CPA en marketing?",
        a: "El CPA (costo por adquisición) es el monto promedio que pagas por conseguir una conversión, como una compra o un lead calificado. Se calcula dividiendo la inversión total entre el número de conversiones obtenidas.",
      },
      {
        q: "¿Cómo se puede reducir el CPA sin perder ventas?",
        a: "La palanca más efectiva es mejorar la señal de conversión con Conversions API y medición server-side, para que la plataforma optimice con datos completos. A eso se suma segmentar por valor de cliente, acelerar la landing y usar exclusiones de audiencia.",
      },
      {
        q: "¿Cambiar las creatividades baja el CPA?",
        a: "Puede ayudar, pero suele tener menos impacto que corregir la medición. Si la plataforma no recibe bien tus conversiones, ninguna creatividad compensará la falta de señal para optimizar.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── Desarrollo y SEO
  {
    slug: "seo-tecnico-checklist-desarrollo",
    categorySlug: "desarrollo-seo",
    title: "SEO técnico: la checklist de desarrollo que sí mueve tu posicionamiento",
    excerpt:
      "El contenido no rankea si la base técnica falla. La checklist de desarrollo que Google necesita para indexar, entender y priorizar tu sitio.",
    coverAlt:
      "Portada del artículo sobre SEO técnico y la checklist de desarrollo para mejorar el posicionamiento, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-06-30",
    dateModified: "2026-07-10",
    readingMinutes: 9,
    keywords: [
      "SEO técnico",
      "Core Web Vitals",
      "indexación",
      "datos estructurados",
      "sitemap",
      "canonical",
    ],
    tldr: [
      "El SEO técnico es la base: sin ella, el mejor contenido no se indexa ni se posiciona.",
      "Las tres prioridades son indexabilidad, velocidad (Core Web Vitals) y datos estructurados.",
      "Un sitemap.xml correcto y un robots.txt bien configurado le dicen a Google qué mirar.",
      "Los datos estructurados (schema.org) hoy también alimentan las respuestas de IA (GEO).",
    ],
    body: [
      {
        type: "p",
        text: "Se puede escribir el mejor artículo del mundo, pero si Google no puede rastrearlo, indexarlo y entenderlo, no existe para el buscador. El SEO técnico es esa capa invisible que decide si tu contenido siquiera tiene la oportunidad de competir. Esta es la checklist que revisamos —y aplicamos en cada [sitio que desarrollamos](/digitalizacion-de-negocios)— antes de preocuparnos por las palabras clave.",
      },
      { type: "h2", text: "¿Qué es el SEO técnico?" },
      {
        type: "p",
        text: "Es el conjunto de optimizaciones del código y la infraestructura de un sitio que facilitan que los motores de búsqueda lo rastreen, indexen y comprendan. No trata de qué dices, sino de cómo tu sitio se lo presenta a los buscadores y, cada vez más, a los motores de IA.",
      },
      { type: "h2", text: "La checklist de SEO técnico" },
      {
        type: "h3",
        text: "1. Indexabilidad",
      },
      {
        type: "ul",
        items: [
          "Un `robots.txt` que permita rastrear lo importante y bloquee lo privado.",
          "Un `sitemap.xml` con solo las URLs indexables, enviado a Google Search Console.",
          "Uso correcto de `noindex` en páginas internas o de agradecimiento.",
          "Etiqueta `canonical` en cada página para evitar contenido duplicado.",
        ],
      },
      { type: "h3", text: "2. Velocidad y experiencia (Core Web Vitals)" },
      {
        type: "ul",
        items: [
          "**LCP** (carga del contenido principal) por debajo de 2,5 segundos.",
          "**INP** (respuesta a la interacción) por debajo de 200 ms.",
          "**CLS** (estabilidad visual) por debajo de 0,1.",
          "Imágenes en formatos modernos (WebP/AVIF), con dimensiones declaradas para evitar saltos.",
        ],
      },
      { type: "h3", text: "3. Comprensión (datos estructurados)" },
      {
        type: "ul",
        items: [
          "Schema.org (`Organization`, `WebSite`, `BreadcrumbList`, `Article`, `FAQPage`) enlazado por `@id`.",
          "Jerarquía de encabezados limpia: un solo `h1` por página, luego `h2` y `h3`.",
          "Metadatos y Open Graph correctos para búsqueda y para compartir en redes.",
        ],
      },
      { type: "h2", text: "Prioriza así si tienes tiempo limitado" },
      {
        type: "table",
        headers: ["Prioridad", "Qué revisar", "Impacto"],
        rows: [
          ["Alta", "Indexación (robots, sitemap, canonical, noindex)", "Si falla, nada rankea"],
          ["Alta", "Core Web Vitals", "Ranking y conversión"],
          ["Media", "Datos estructurados", "Rich results y GEO"],
          ["Media", "Enlazado interno", "Distribuye autoridad"],
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "El SEO técnico no te hace ganar solo, pero su ausencia te hace perder seguro. Es la condición de entrada para competir.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el SEO técnico?",
        a: "Es la optimización de los aspectos de código e infraestructura de un sitio web —indexabilidad, velocidad, datos estructurados— que permiten a los motores de búsqueda rastrearlo, indexarlo y entenderlo correctamente.",
      },
      {
        q: "¿Qué es más importante, el contenido o el SEO técnico?",
        a: "Ambos son necesarios y no compiten. El SEO técnico es la condición de entrada: sin él, el contenido no se indexa. El contenido es lo que hace que, una vez indexado, tu página sea relevante y útil para posicionarse.",
      },
      {
        q: "¿Los datos estructurados ayudan con la IA?",
        a: "Sí. Además de habilitar rich results en Google, el marcado schema.org ayuda a los motores de IA a entender y citar tu contenido, lo que se conoce como GEO (optimización para motores generativos).",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── Tipos de gráficos
  {
    slug: "tipos-de-graficos-cuando-usar-cada-uno",
    categorySlug: "tipos-de-graficos",
    title: "Qué tipo de gráfico usar según tus datos (guía práctica con ejemplos)",
    excerpt:
      "Elegir mal el gráfico esconde el insight. Una guía para escoger la visualización correcta según lo que quieras mostrar: comparar, componer, distribuir o relacionar.",
    coverAlt:
      "Portada de la guía sobre qué tipo de gráfico usar según tus datos, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-06-18",
    dateModified: "2026-07-10",
    readingMinutes: 6,
    keywords: [
      "tipos de gráficos",
      "visualización de datos",
      "gráfico de barras",
      "gráfico de líneas",
      "dashboards",
    ],
    tldr: [
      "El gráfico correcto se elige por el objetivo, no por lo que se vea bonito.",
      "Cuatro intenciones cubren casi todo: comparar, mostrar composición, ver distribución y detectar tendencia.",
      "Los gráficos de torta funcionan mal con más de 3–4 categorías: usa barras.",
      "Menos es más: elimina todo lo que no ayude a leer el dato.",
    ],
    body: [
      {
        type: "p",
        text: "Un gráfico existe para responder una pregunta más rápido que una tabla. Cuando eliges el tipo equivocado, ocurre lo contrario: escondes el insight bajo decoración. La clave no es memorizar 40 tipos de gráfico, sino identificar qué quieres mostrar: elegir bien es parte esencial del [análisis digital](/blog/analisis-digital-datos-a-decisiones). Casi todo cae en cuatro intenciones.",
      },
      { type: "h2", text: "¿Qué quieres mostrar? Empieza por ahí" },
      {
        type: "table",
        headers: ["Tu objetivo", "Gráfico recomendado", "Evita"],
        rows: [
          ["Comparar categorías", "Barras (horizontales si hay muchas)", "Torta con más de 4 partes"],
          ["Mostrar composición del total", "Barras apiladas o treemap", "Múltiples tortas lado a lado"],
          ["Ver evolución en el tiempo", "Líneas", "Barras 3D"],
          ["Ver distribución de valores", "Histograma o boxplot", "Líneas"],
          ["Ver relación entre dos variables", "Dispersión (scatter)", "Barras"],
          ["Mostrar un solo KPI", "Número grande (big number) con tendencia", "Medidor tipo velocímetro"],
        ],
      },
      { type: "h2", text: "Reglas rápidas que casi nunca fallan" },
      {
        type: "ul",
        items: [
          "**Tiempo en el eje horizontal, siempre.** El ojo lee el tiempo de izquierda a derecha.",
          "**Ordena las barras por valor** cuando la categoría no tiene un orden natural.",
          "**Empieza el eje Y en cero** en gráficos de barras; recortarlo exagera diferencias.",
          "**Máximo 5–6 series por gráfico.** Más que eso es un plato de espagueti.",
          "**Un color con intención:** resalta lo importante, apaga el resto.",
        ],
      },
      { type: "h2", text: "El error más común: la torta" },
      {
        type: "p",
        text: "El gráfico de torta es el más usado y el peor entendido. El ojo humano compara mal ángulos y áreas. Con dos o tres categorías puede funcionar; con más, se vuelve ilegible. En la duda, un gráfico de barras ordenado casi siempre comunica mejor la misma información.",
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "Primero define la pregunta que el gráfico debe responder; el tipo de gráfico correcto casi se elige solo.",
      },
    ],
    faq: [
      {
        q: "¿Cuándo se debe usar un gráfico de líneas?",
        a: "Cuando quieres mostrar la evolución de una o varias métricas a lo largo del tiempo. El eje horizontal representa el tiempo y la línea revela tendencias, estacionalidad y quiebres con más claridad que las barras.",
      },
      {
        q: "¿Por qué se recomienda evitar los gráficos de torta?",
        a: "Porque el ojo humano compara ángulos y áreas con poca precisión. Con más de tres o cuatro categorías, una torta se vuelve difícil de leer; un gráfico de barras ordenado comunica la misma composición de forma más clara.",
      },
      {
        q: "¿Cómo elijo el gráfico correcto?",
        a: "Parte por tu objetivo: comparar, mostrar composición, ver distribución, analizar tendencia o relacionar variables. Cada intención tiene un tipo de gráfico recomendado, y definir la pregunta primero simplifica la elección.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── Análisis digital
  {
    slug: "analisis-digital-datos-a-decisiones",
    categorySlug: "analisis-digital",
    title: "Análisis digital para dueños de negocio: de los datos a las decisiones",
    excerpt:
      "Tener GA4 instalado no es analizar. El marco práctico para pasar de mirar métricas a tomar decisiones que mueven la aguja.",
    coverAlt:
      "Portada del artículo sobre análisis digital para dueños de negocio, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-07-05",
    dateModified: "2026-07-10",
    readingMinutes: 8,
    keywords: [
      "análisis digital",
      "analítica web",
      "GA4",
      "embudo de conversión",
      "toma de decisiones",
    ],
    tldr: [
      "Análisis digital no es mirar métricas, es responder preguntas de negocio con datos.",
      "Usa el marco Pregunta → Métrica → Segmento → Acción para no perderte en los reportes.",
      "Una métrica sin segmento no dice nada: el promedio esconde lo que importa.",
      "Si un dato no cambia ninguna decisión, no lo reportes.",
    ],
    body: [
      {
        type: "p",
        text: "Muchos dueños de negocio tienen GA4 instalado y, aun así, no saben qué hacer con él. El problema no es la herramienta: es que mirar métricas no es lo mismo que analizar. Analizar es usar los datos para responder una pregunta y tomar una decisión. Este es el marco que usamos para que la analítica deje de ser un tablero bonito y empiece a generar plata.",
      },
      { type: "h2", text: "¿Qué es el análisis digital?" },
      {
        type: "p",
        text: "El análisis digital es el proceso de recolectar, medir e interpretar los datos del comportamiento de tus usuarios (en tu web, app y campañas) para tomar mejores decisiones comerciales. La palabra clave es decisiones: los datos que no cambian una acción son solo ruido.",
      },
      { type: "h2", text: "El marco: Pregunta → Métrica → Segmento → Acción" },
      {
        type: "ol",
        items: [
          "**Pregunta:** empieza por una duda de negocio concreta. No '¿cómo va la web?', sino '¿por qué caen las ventas de móvil?'.",
          "**Métrica:** elige la métrica que responde esa pregunta (tasa de conversión móvil vs. escritorio).",
          "**Segmento:** desglosa. El promedio miente; el insight vive en los segmentos (dispositivo, canal, ciudad, cliente nuevo vs. recurrente).",
          "**Acción:** define qué harás según cada resultado, antes de mirar el número. Muchas de esas métricas son [ratios y tasas concretos](/blog/ratios-y-tasas-marketing-clave); si no hay acción posible, la pregunta no valía la pena.",
        ],
      },
      { type: "h2", text: "Las tres vistas que todo dueño debería revisar" },
      {
        type: "table",
        headers: ["Vista", "Qué revela", "Decisión típica"],
        rows: [
          ["Embudo de conversión", "Dónde se cae la gente antes de comprar", "Arreglar el paso que más pierde"],
          ["Por canal / origen", "Qué fuentes traen clientes que compran", "Reasignar presupuesto de pauta"],
          ["Cohortes / recurrencia", "Si los clientes vuelven o se van", "Invertir en retención vs. adquisición"],
        ],
      },
      {
        type: "quote",
        text: "El promedio es el mejor lugar para esconder un problema. El análisis empieza cuando segmentas.",
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "No midas todo lo que puedes; mide lo que cambia una decisión. Menos métricas y más acción.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el análisis digital?",
        a: "Es el proceso de recolectar, medir e interpretar datos del comportamiento de los usuarios en la web, apps y campañas, con el fin de tomar mejores decisiones comerciales. Su objetivo no es reportar, sino habilitar decisiones.",
      },
      {
        q: "¿Por dónde empiezo a analizar los datos de mi negocio?",
        a: "Por una pregunta de negocio concreta, no por la herramienta. Define qué necesitas decidir, elige la métrica que responde esa pregunta, segméntala para encontrar el detalle relevante y define la acción que tomarás según el resultado.",
      },
      {
        q: "¿Por qué no basta con mirar los promedios?",
        a: "Porque el promedio mezcla comportamientos distintos y oculta el insight. Una tasa de conversión promedio 'sana' puede esconder que el móvil convierte la mitad que el escritorio. Segmentar es lo que revela dónde actuar.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── Ratios y tasas
  {
    slug: "ratios-y-tasas-marketing-clave",
    categorySlug: "ratios-y-tasas",
    title: "Los 10 ratios y tasas de marketing que todo negocio debería medir",
    excerpt:
      "Sin estos números, escalar es apostar. Diez ratios con su fórmula y su interpretación para saber si tu marketing es rentable.",
    coverAlt:
      "Portada del artículo sobre los 10 ratios y tasas de marketing clave, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-06-12",
    dateModified: "2026-07-10",
    readingMinutes: 7,
    keywords: ["ratios de marketing", "CAC", "LTV", "ROAS", "tasa de conversión", "métricas"],
    tldr: [
      "Estos diez ratios convierten actividad ('publicamos mucho') en resultado ('ganamos plata').",
      "El más importante es la relación LTV/CAC: mide si adquirir clientes es sostenible.",
      "Un ROAS alto no siempre es rentable: revisa el margen, no solo el ingreso.",
      "Mide siempre la tendencia, no el dato aislado de un mes.",
    ],
    body: [
      {
        type: "p",
        text: "Escalar un negocio sin medir sus ratios es como acelerar sin tablero: puede que avances, pero no sabes si vas a chocar. Estos diez indicadores traducen la actividad de marketing en lenguaje financiero. No necesitas todos desde el día uno, pero sí entender qué te dice cada uno.",
      },
      { type: "h2", text: "Los 10 ratios, con fórmula e interpretación" },
      {
        type: "table",
        headers: ["Ratio", "Fórmula", "Qué te dice"],
        rows: [
          ["CAC (costo de adquisición)", "Inversión ÷ clientes nuevos", "Cuánto te cuesta ganar un cliente"],
          ["LTV (valor de vida)", "Ticket medio × frecuencia × años", "Cuánto vale un cliente en el tiempo"],
          ["LTV / CAC", "LTV ÷ CAC", "Si el negocio es sostenible (ideal ≥ 3)"],
          ["ROAS", "Ingresos por pauta ÷ inversión en pauta", "Retorno bruto de la publicidad"],
          ["Tasa de conversión", "Conversiones ÷ visitas × 100", "Qué tan bien convierte tu sitio"],
          ["Ticket promedio (AOV)", "Ingresos ÷ número de pedidos", "Cuánto gasta cada compra"],
          ["Tasa de retención", "Clientes que repiten ÷ total × 100", "Si logras que vuelvan"],
          ["Tasa de abandono (churn)", "Clientes perdidos ÷ total × 100", "A qué ritmo se van"],
          ["CPL (costo por lead)", "Inversión ÷ leads generados", "Cuánto cuesta cada contacto"],
          ["CTR (tasa de clics)", "Clics ÷ impresiones × 100", "Qué tan relevante es tu anuncio"],
        ],
      },
      { type: "h2", text: "El ratio que manda: LTV / CAC" },
      {
        type: "p",
        text: "Si solo pudieras medir uno, mide la relación entre el valor de vida del cliente y su costo de adquisición. Una relación de 3 a 1 suele indicar un negocio sano: ganas tres veces lo que gastas en conseguir cada cliente. Por debajo de 1, estás pagando por perder dinero; muy por encima de 5, probablemente estás dejando de crecer por invertir de menos. Interpretar estos números es la esencia del [análisis digital](/blog/analisis-digital-datos-a-decisiones).",
      },
      { type: "h2", text: "Cuidado con el ROAS 'vanidoso'" },
      {
        type: "ul",
        items: [
          "Un ROAS de 5x sobre productos con 20% de margen puede seguir dando pérdida.",
          "Mide el ROAS contra tu margen de contribución, no contra el ingreso bruto.",
          "Un ROAS altísimo a veces solo significa que estás captando ventas que ya ibas a tener.",
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "Los ratios no se leen aislados. Un número solo es un dato; la tendencia y su relación con el margen son la historia.",
      },
    ],
    faq: [
      {
        q: "¿Cuál es el ratio de marketing más importante?",
        a: "La relación LTV/CAC, que compara el valor de vida del cliente con el costo de adquirirlo. Indica si el modelo de adquisición es sostenible; una relación cercana a 3 a 1 suele considerarse saludable.",
      },
      {
        q: "¿Qué diferencia hay entre CAC y CPL?",
        a: "El CPL (costo por lead) mide cuánto cuesta generar un contacto interesado, mientras que el CAC (costo de adquisición) mide cuánto cuesta convertir ese interés en un cliente que efectivamente compra. Varios leads se necesitan para lograr una adquisición.",
      },
      {
        q: "¿Un ROAS alto significa que soy rentable?",
        a: "No necesariamente. El ROAS mide el retorno sobre el ingreso bruto, no sobre el margen. Un ROAS alto en productos de bajo margen puede seguir siendo deficitario; hay que compararlo contra el margen de contribución.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── Tips de medición
  {
    slug: "medicion-de-eventos-sin-perder-datos",
    categorySlug: "tips-de-medicion",
    title: "Medición de eventos: cómo dejar de perder datos por cookies y AdBlockers",
    excerpt:
      "Entre el 10% y el 30% de tus conversiones no se están midiendo. Cómo recuperarlas con medición server-side, Conversions API y consent mode.",
    coverAlt:
      "Portada del artículo sobre medición de eventos server-side para no perder datos por cookies y AdBlockers, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-07-09",
    dateModified: "2026-07-10",
    readingMinutes: 8,
    keywords: [
      "medición de eventos",
      "server-side tagging",
      "Conversions API",
      "consent mode",
      "GA4",
    ],
    tldr: [
      "El tracking solo con el navegador pierde entre 10% y 30% de las conversiones por cookies, ITP y AdBlockers.",
      "La medición server-side y las Conversions API (CAPI) recuperan gran parte de esa señal perdida.",
      "El Consent Mode permite medir respetando la decisión de privacidad del usuario.",
      "Una buena nomenclatura de eventos es tan importante como la infraestructura.",
    ],
    body: [
      {
        type: "p",
        text: "Si tomas decisiones con lo que mide tu píxel de navegador, estás decidiendo con datos incompletos y ni siquiera lo sabes. Safari limita las cookies, los AdBlockers bloquean scripts y el consentimiento mal implementado descarta eventos. El resultado: pierdes entre un 10% y un 30% de tus conversiones. La buena noticia es que se recuperan.",
      },
      { type: "h2", text: "¿Por qué se pierden datos de eventos?" },
      {
        type: "ul",
        items: [
          "**ITP de Safari** y navegadores similares acortan la vida de las cookies.",
          "**AdBlockers** bloquean directamente los scripts de medición del lado del navegador.",
          "**Consentimiento** mal configurado descarta eventos que sí podías medir de forma agregada.",
          "**Fallos de red** en el dispositivo del usuario que nunca llegan a registrarse.",
        ],
      },
      { type: "h2", text: "La solución: mover la medición al servidor" },
      {
        type: "p",
        text: "La medición server-side traslada el envío de eventos desde el navegador del usuario a un servidor que tú controlas. Desde ahí, las Conversions API (CAPI de Meta, la API de conversiones de Google) envían los eventos directamente a las plataformas, sin depender de cookies de terceros ni de que el navegador coopere. Es el corazón de nuestro servicio de [optimización y medición](/optimizacion-de-negocios).",
      },
      {
        type: "table",
        headers: ["Aspecto", "Medición en navegador", "Medición server-side"],
        rows: [
          ["Afectada por AdBlockers", "Sí", "No"],
          ["Depende de cookies de terceros", "Sí", "Menos"],
          ["Precisión de conversiones", "70–90%", "95–99%"],
          ["Control del dato", "Del navegador", "Tuyo"],
        ],
      },
      { type: "h2", text: "Cómo implementarlo, paso a paso" },
      {
        type: "ol",
        items: [
          "Define tu plan de medición: qué eventos importan (compra, lead, add_to_cart) y con qué parámetros.",
          "Estandariza la nomenclatura de eventos antes de tocar nada. Nombres consistentes, para siempre.",
          "Monta un contenedor server-side en Google Tag Manager.",
          "Conecta las Conversions API de Meta y Google para deduplicar con el píxel.",
          "Configura Consent Mode para medir respetando la privacidad del usuario.",
          "Valida con eventos de prueba y compara contra tu fuente de verdad (el ERP o la pasarela).",
        ],
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "No puedes optimizar lo que no mides bien. Recuperar la señal perdida suele mejorar tanto tus reportes como el rendimiento de tus campañas.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la medición de eventos server-side?",
        a: "Es una forma de rastrear eventos (compras, leads, clics) enviándolos desde un servidor que tú controlas en lugar del navegador del usuario. Así se evita la pérdida de datos causada por AdBlockers, límites de cookies y restricciones de los navegadores.",
      },
      {
        q: "¿Cuántas conversiones se pierden con el tracking tradicional?",
        a: "Habitualmente entre un 10% y un 30%, dependiendo del navegador, el uso de AdBlockers y la configuración de consentimiento. La medición server-side con Conversions API recupera gran parte de esa señal.",
      },
      {
        q: "¿La medición server-side respeta la privacidad?",
        a: "Sí, cuando se implementa con Consent Mode y buenas prácticas de datos. Permite medir de forma agregada y respetuosa la decisión del usuario, sin depender de cookies de terceros ni recolectar más datos de los necesarios.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── Martech
  {
    slug: "que-es-martech-como-armar-stack",
    categorySlug: "martech",
    title: "Qué es el stack martech y cómo armar el tuyo sin morir en el intento",
    excerpt:
      "Martech no es acumular software, es orquestarlo. Las cuatro capas de un stack de marketing y cómo integrarlas para que trabajen como un solo sistema.",
    coverAlt:
      "Portada del artículo sobre qué es el stack martech y cómo armarlo, de Prisma Digital.",
    author: AUTHOR,
    datePublished: "2026-06-27",
    dateModified: "2026-07-10",
    readingMinutes: 8,
    keywords: ["martech", "stack de marketing", "integración", "CDP", "automatización"],
    tldr: [
      "Martech (marketing + technology) es el conjunto de herramientas que usas para atraer, convertir y retener clientes.",
      "Un buen stack se organiza en cuatro capas: datos, activación, análisis y orquestación.",
      "El valor no está en las herramientas, está en cómo se integran entre sí.",
      "Más herramientas no es mejor: el 'tool sprawl' genera costo, datos duplicados y confusión.",
    ],
    body: [
      {
        type: "p",
        text: "La palabra martech asusta más de lo que debería. En el fondo es simple: es toda la tecnología que usas para hacer marketing. El problema no es entender qué es, sino armarlo bien. Muchos negocios terminan con veinte herramientas que no se hablan, pagando por funciones repetidas y con los datos partidos en silos. Así se arma un stack que funcione como un sistema, no como un rompecabezas.",
      },
      { type: "h2", text: "¿Qué es martech?" },
      {
        type: "p",
        text: "Martech es la contracción de 'marketing' y 'technology': el conjunto de plataformas y software que una empresa usa para planificar, ejecutar y medir sus acciones de marketing. Va desde el CRM y el email hasta la analítica y la automatización. Un 'stack martech' es simplemente cómo esas piezas se combinan en tu empresa.",
      },
      { type: "h2", text: "Las cuatro capas de un stack martech" },
      {
        type: "table",
        headers: ["Capa", "Función", "Herramientas típicas"],
        rows: [
          ["Datos", "Recolectar y unificar la información del cliente", "GA4, GTM server-side, CDP"],
          ["Activación", "Ejecutar campañas y comunicación", "Meta/Google Ads, email, WhatsApp"],
          ["Análisis", "Medir e interpretar resultados", "Looker Studio, BI"],
          ["Orquestación", "Automatizar flujos y conectar todo", "CRM, automation, integraciones/API"],
        ],
      },
      { type: "h2", text: "Cómo armar el tuyo sin caer en el 'tool sprawl'" },
      {
        type: "ol",
        items: [
          "Parte por la capa de datos: si no unificas la información del cliente (con buena [medición](/blog/medicion-de-eventos-sin-perder-datos) y [herramientas integradas](/blog/herramientas-digitales-imprescindibles)), el resto se construye sobre arena.",
          "Agrega herramientas solo cuando resuelvan un problema concreto y medible.",
          "Exige integración: cada nueva herramienta debe conectarse con las que ya tienes.",
          "Elimina duplicados: dos herramientas que hacen lo mismo son costo y confusión.",
          "Revisa el stack cada trimestre y da de baja lo que nadie usa.",
        ],
      },
      {
        type: "quote",
        text: "Un stack martech no se mide por cuántas herramientas tiene, sino por qué tan bien conversan entre ellas.",
      },
      {
        type: "callout",
        title: "Punto clave",
        text: "Empieza pequeño y bien integrado. Es más fácil sumar una herramienta a un sistema ordenado que ordenar veinte herramientas sueltas.",
      },
    ],
    faq: [
      {
        q: "¿Qué es un stack martech?",
        a: "Es el conjunto de herramientas de tecnología de marketing (martech) que una empresa combina para atraer, convertir y retener clientes. Suele organizarse en cuatro capas: datos, activación, análisis y orquestación.",
      },
      {
        q: "¿Cuántas herramientas debería tener mi stack de marketing?",
        a: "Las mínimas que cubran las cuatro capas y estén bien integradas. Más herramientas no significa mejor marketing; el exceso ('tool sprawl') genera costos, datos duplicados y confusión. La integración importa más que la cantidad.",
      },
      {
        q: "¿Por dónde empiezo a construir mi stack martech?",
        a: "Por la capa de datos. Unificar la información del cliente (con analítica y una buena medición) es la base sobre la que funcionan la activación, el análisis y la automatización. Sin datos confiables, el resto del stack no rinde.",
      },
    ],
  },
];

// ─────────────────────────────────────────── Helpers de consulta y utilidades

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const postsByCategory = (slug: string) => posts.filter((p) => p.categorySlug === slug);

// Interlinking curado: qué leer después de cada post (relación temática real).
const relatedMap: Record<string, string[]> = {
  "herramientas-digitales-imprescindibles": [
    "que-es-martech-como-armar-stack",
    "medicion-de-eventos-sin-perder-datos",
    "buenas-practicas-higiene-de-datos",
  ],
  "buenas-practicas-higiene-de-datos": [
    "analisis-digital-datos-a-decisiones",
    "medicion-de-eventos-sin-perder-datos",
    "ratios-y-tasas-marketing-clave",
  ],
  "tips-marketing-bajar-cpa": [
    "medicion-de-eventos-sin-perder-datos",
    "ratios-y-tasas-marketing-clave",
    "analisis-digital-datos-a-decisiones",
  ],
  "seo-tecnico-checklist-desarrollo": [
    "herramientas-digitales-imprescindibles",
    "medicion-de-eventos-sin-perder-datos",
    "analisis-digital-datos-a-decisiones",
  ],
  "tipos-de-graficos-cuando-usar-cada-uno": [
    "analisis-digital-datos-a-decisiones",
    "ratios-y-tasas-marketing-clave",
    "buenas-practicas-higiene-de-datos",
  ],
  "analisis-digital-datos-a-decisiones": [
    "ratios-y-tasas-marketing-clave",
    "tipos-de-graficos-cuando-usar-cada-uno",
    "medicion-de-eventos-sin-perder-datos",
  ],
  "ratios-y-tasas-marketing-clave": [
    "analisis-digital-datos-a-decisiones",
    "tips-marketing-bajar-cpa",
    "tipos-de-graficos-cuando-usar-cada-uno",
  ],
  "medicion-de-eventos-sin-perder-datos": [
    "tips-marketing-bajar-cpa",
    "que-es-martech-como-armar-stack",
    "buenas-practicas-higiene-de-datos",
  ],
  "que-es-martech-como-armar-stack": [
    "herramientas-digitales-imprescindibles",
    "medicion-de-eventos-sin-perder-datos",
    "analisis-digital-datos-a-decisiones",
  ],
};

/** Posts relacionados curados; si faltan, completa con otros recientes. */
export function relatedPosts(slug: string, count = 3): Post[] {
  const curated = (relatedMap[slug] ?? [])
    .map((s) => postBySlug(s))
    .filter((p): p is Post => Boolean(p));
  const extra = posts.filter((p) => p.slug !== slug && !curated.includes(p));
  return [...curated, ...extra].slice(0, count);
}

export const postUrl = (slug: string) => `${SITE}/blog/${slug}`;
export const postCover = (slug: string) => `/blog/${slug}.png`;
export const postCoverAbsolute = (slug: string) => `${SITE}/blog/${slug}.png`;

/** Conteo aproximado de palabras para el schema (wordCount). */
export function wordCount(post: Post): number {
  let text = post.title + " " + post.excerpt + " " + post.tldr.join(" ");
  for (const b of post.body) {
    if ("text" in b) text += " " + b.text;
    if (b.type === "ul" || b.type === "ol") text += " " + b.items.join(" ");
    if (b.type === "table") text += " " + b.headers.join(" ") + " " + b.rows.flat().join(" ");
  }
  for (const f of post.faq) text += " " + f.q + " " + f.a;
  return text.trim().split(/\s+/).length;
}
