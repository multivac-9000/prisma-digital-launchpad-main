import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Wrench,
  CheckCircle2,
  Megaphone,
  Code2,
  BarChart3,
  LineChart,
  Percent,
  Gauge,
  Layers,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import { buildGraph, webPage, breadcrumbTrail, blogListing } from "@/lib/schema";
import {
  posts,
  categories,
  categoryBySlug,
  postsByCategory,
  postCover,
  postUrl,
  postCoverAbsolute,
  SITE,
} from "@/content/blog";

const CANONICAL_URL = `${SITE}/blog`;
const OG_IMAGE = `${SITE}/blog/index.png`;

const ACCENT_VAR: Record<string, string> = {
  cyan: "var(--prisma-cyan)",
  magenta: "var(--prisma-magenta)",
  red: "var(--prisma-red)",
};

const ICONS: Record<string, LucideIcon> = {
  Wrench,
  CheckCircle2,
  Megaphone,
  Code2,
  BarChart3,
  LineChart,
  Percent,
  Gauge,
  Layers,
};

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Blog de Prisma Digital — Marketing, datos y medición",
    description:
      "Guías prácticas de marketing digital, medición, análisis, martech y SEO para empresas consolidadas que quieren crecer con datos.",
    image: OG_IMAGE,
    withBreadcrumb: true,
  }),
  breadcrumbTrail(CANONICAL_URL, [
    { name: "Inicio", item: `${SITE}/` },
    { name: "Blog", item: CANONICAL_URL },
  ]),
  blogListing(
    posts.map((p) => ({
      url: postUrl(p.slug),
      title: p.title,
      datePublished: p.datePublished,
      image: postCoverAbsolute(p.slug),
    })),
  ),
);

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog de Prisma Digital — Marketing, datos y medición" },
      {
        name: "description",
        content:
          "Guías prácticas de marketing digital, medición de eventos, análisis, martech y SEO para empresas consolidadas que quieren crecer con datos.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Blog de Prisma Digital — Marketing, datos y medición" },
      {
        property: "og:description",
        content:
          "Guías prácticas de marketing digital, medición, análisis, martech y SEO para crecer con datos.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Blog de Prisma Digital: guías de marketing, datos y medición.",
      },
      { name: "twitter:title", content: "Blog de Prisma Digital" },
      {
        name: "twitter:description",
        content: "Guías prácticas de marketing digital, medición, análisis, martech y SEO.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: BlogIndex,
});

const dateFmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Kicker({ label, accent }: { label?: string; accent: string }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: accent }}
    >
      {label}
    </span>
  );
}

function BlogIndex() {
  const featured = posts[0];
  const rest = posts.slice(1);
  const fCat = categoryBySlug(featured.categorySlug);
  const fAccent = ACCENT_VAR[fCat?.accent ?? "cyan"];

  return (
    <main className="blog-canvas min-h-screen">
      <Navbar />

      {/* Masthead editorial */}
      <header className="px-6 pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-prisma-magenta">
            El blog de Prisma Digital
          </p>
          <h1 className="blog-serif mx-auto mt-4 max-w-3xl text-balance text-4xl md:text-6xl font-bold leading-[1.06] tracking-tight text-ink">
            Ideas claras sobre marketing, datos y medición
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink/65">
            Guías prácticas para digitalizar, medir y hacer crecer negocios con trayectoria —
            con decisiones basadas en datos, no en suposiciones.
          </p>
          <div className="blog-rule mx-auto mt-8 w-24" />
        </div>
      </header>

      {/* Post destacado */}
      <section className="px-6 pb-6" aria-label="Artículo destacado">
        <article className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm md:grid-cols-2">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group block overflow-hidden bg-prisma-navy"
          >
            <img
              src={postCover(featured.slug)}
              alt={featured.coverAlt}
              width={1200}
              height={630}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
          <div className="flex flex-col justify-center p-7 md:p-9">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ background: fAccent }}
              >
                Destacado
              </span>
              <Kicker label={fCat?.label} accent={fAccent} />
            </div>
            <h2 className="blog-serif text-2xl md:text-[2rem] font-bold leading-tight text-ink">
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="transition-colors hover:text-prisma-magenta"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 text-ink/70 leading-relaxed">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-ink/55">
              <span>{dateFmt(featured.datePublished)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {featured.readingMinutes} min
              </span>
            </div>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
              style={{ background: fAccent }}
            >
              Leer artículo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </section>

      {/* Explora por temática */}
      <section className="px-6 py-12 md:py-16" aria-labelledby="temas-title">
        <div className="mx-auto max-w-6xl">
          <h2
            id="temas-title"
            className="blog-serif mb-7 text-2xl md:text-3xl font-bold tracking-tight text-ink"
          >
            Explora por temática
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = ICONS[c.icon] ?? Layers;
              const accent = ACCENT_VAR[c.accent];
              const target = postsByCategory(c.slug)[0];
              const inner = (
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: accent }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-ink">{c.label}</h3>
                      {target && (
                        <ArrowUpRight
                          className="h-4 w-4 text-ink/40"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-snug text-ink/60">{c.description}</p>
                  </div>
                </div>
              );
              return target ? (
                <Link key={c.slug} to="/blog/$slug" params={{ slug: target.slug }}>
                  {inner}
                </Link>
              ) : (
                <div key={c.slug}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Últimos artículos */}
      <section className="px-6 pb-20" aria-labelledby="articulos-title">
        <div className="mx-auto max-w-6xl">
          <h2
            id="articulos-title"
            className="blog-serif mb-7 text-2xl md:text-3xl font-bold tracking-tight text-ink"
          >
            Últimos artículos
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => {
              const cat = categoryBySlug(p.categorySlug);
              const accent = ACCENT_VAR[cat?.accent ?? "cyan"];
              return (
                <article
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderTop: `3px solid ${accent}` }}
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="flex flex-1 flex-col"
                  >
                    <div className="aspect-[1200/630] overflow-hidden bg-prisma-navy">
                      <img
                        src={postCover(p.slug)}
                        alt={p.coverAlt}
                        width={1200}
                        height={630}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <Kicker label={cat?.label} accent={accent} />
                      <h3 className="blog-serif mt-2 text-xl font-bold leading-snug text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">
                        {p.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 pt-2 text-xs text-ink/55">
                        <span>{dateFmt(p.datePublished)}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {p.readingMinutes} min
                        </span>
                        <ArrowRight
                          className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                          style={{ color: accent }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FooterNueva />
    </main>
  );
}
