import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import { buildGraph, webPage, breadcrumbTrail, blogListing } from "@/lib/schema";
import {
  posts,
  categories,
  categoryBySlug,
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

function BlogIndex() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <header
        className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-24 text-center text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="hero-aura" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-prisma-cyan">
            Blog
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Marketing, datos y medición para negocios que quieren escalar
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
            Guías prácticas para digitalizar, medir y crecer con decisiones basadas en datos —
            no en suposiciones.
          </p>

          {/* Temáticas */}
          <ul className="mt-9 flex flex-wrap justify-center gap-2.5 list-none">
            {categories.map((c) => (
              <li key={c.slug}>
                <span
                  className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold text-white/90"
                  style={{ borderColor: ACCENT_VAR[c.accent] }}
                >
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Grid de artículos */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="mb-8 text-2xl md:text-3xl font-extrabold tracking-tight text-ink">
          Todos los artículos
        </h2>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const cat = categoryBySlug(p.categorySlug);
            const accent = ACCENT_VAR[cat?.accent ?? "cyan"];
            return (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: accent }}
                >
                  <div className="relative aspect-[1200/630] overflow-hidden bg-prisma-navy">
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
                    <span
                      className="mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                      style={{ background: accent }}
                    >
                      {cat?.label}
                    </span>
                    <h3 className="text-lg font-bold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">
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
      </section>

      <FooterNueva />
    </main>
  );
}
