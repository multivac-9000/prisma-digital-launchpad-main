import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, RefreshCw, Sparkles, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import BlogContent from "@/components/blog/BlogContent";
import {
  buildGraph,
  webPage,
  breadcrumbTrail,
  blogPosting,
  faqPage,
} from "@/lib/schema";
import {
  postBySlug,
  categoryBySlug,
  relatedPosts,
  postUrl,
  postCover,
  postCoverAbsolute,
  wordCount,
  SITE,
} from "@/content/blog";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

const ACCENT_VAR: Record<string, string> = {
  cyan: "var(--prisma-cyan)",
  magenta: "var(--prisma-magenta)",
  red: "var(--prisma-red)",
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!postBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Artículo no encontrado — Prisma Digital" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const url = postUrl(post.slug);
    const cover = postCoverAbsolute(post.slug);
    const cat = categoryBySlug(post.categorySlug);
    const jsonLd = buildGraph(
      webPage({
        url,
        name: post.title,
        description: post.excerpt,
        image: cover,
        withBreadcrumb: true,
      }),
      blogPosting({
        url,
        headline: post.title,
        description: post.excerpt,
        image: cover,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        section: cat?.label ?? "Blog",
        keywords: post.keywords,
        wordCount: wordCount(post),
      }),
      faqPage(url, post.faq),
      breadcrumbTrail(url, [
        { name: "Inicio", item: `${SITE}/` },
        { name: "Blog", item: `${SITE}/blog` },
        { name: cat?.label ?? "Artículo", item: url },
      ]),
    );
    return {
      meta: [
        // <title>/og/twitter usan seoTitle (≤60 caracteres); el <h1> y el
        // headline del schema usan el título expresivo completo (post.title).
        { title: post.seoTitle },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "robots", content: "index, follow" },
        { name: "author", content: post.author },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.seoTitle },
        { property: "og:description", content: post.excerpt },
        { property: "og:url", content: url },
        { property: "og:image", content: cover },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: post.coverAlt },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: post.dateModified },
        { property: "article:section", content: cat?.label ?? "Blog" },
        { name: "twitter:title", content: post.seoTitle },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: cover },
        { name: "twitter:image:alt", content: post.coverAlt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: jsonLd }],
    };
  },
  component: BlogPost,
});

const dateFmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function BlogPost() {
  const { slug } = Route.useParams();
  const post = postBySlug(slug);

  if (!post) {
    return (
      <main className="blog-canvas flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <Navbar variant="light" />
        <h1 className="blog-serif text-2xl font-bold text-ink">Artículo no encontrado</h1>
        <Link to="/blog" className="mt-4 font-semibold text-prisma-magenta">
          Volver al blog
        </Link>
      </main>
    );
  }

  const cat = categoryBySlug(post.categorySlug);
  const accent = ACCENT_VAR[cat?.accent ?? "cyan"];
  const related = relatedPosts(post.slug, 3);
  const updated = post.dateModified !== post.datePublished;

  return (
    <main className="blog-canvas min-h-screen">
      <Navbar variant="light" />

      {/* Encabezado editorial (claro, distinto de las landings) */}
      <header className="px-6 pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-ink/50">
            <ol className="flex flex-wrap items-center gap-1.5 list-none">
              <li>
                <Link to="/" className="hover:text-ink">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink/70">{cat?.label}</li>
            </ol>
          </nav>

          <Link
            to="/blog"
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {cat?.label}
          </Link>

          <h1 className="blog-serif mt-3 text-balance text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-ink">
            {post.title}
          </h1>

          <p className="blog-serif mt-5 text-lg md:text-xl leading-relaxed text-ink/70">
            {post.excerpt}
          </p>

          {/* Autor + meta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink/60">
            <span className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden="true"
              >
                PD
              </span>
              <span className="font-semibold text-ink/80">{post.author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {dateFmt(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingMinutes} min
            </span>
            {updated && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Actualizado {dateFmt(post.dateModified)}
              </span>
            )}
          </div>

          <div className="blog-rule mt-7 w-full opacity-70" />
        </div>
      </header>

      {/* Cuerpo */}
      <article className="mx-auto max-w-3xl px-6 pb-4">
        <img
          src={postCover(post.slug)}
          alt={post.coverAlt}
          width={1200}
          height={630}
          className="mb-10 w-full rounded-2xl border border-ink/10 shadow-sm"
        />

        {/* Puntos clave (GEO) */}
        <section
          aria-label="Puntos clave"
          className="mb-10 rounded-2xl border border-ink/10 bg-white p-5 md:p-6 shadow-sm"
          style={{ borderInlineStartWidth: 4, borderInlineStartColor: accent }}
        >
          <p
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Puntos clave
          </p>
          <ul className="space-y-2.5 list-none">
            {post.tldr.map((t, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: accent }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <BlogContent body={post.body} accent={cat?.accent ?? "cyan"} />

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mt-16">
          <h2
            id="faq-title"
            className="blog-serif mb-5 inline-flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-ink"
          >
            <HelpCircle className="h-6 w-6" style={{ color: accent }} aria-hidden="true" />
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {post.faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-ink/10 bg-white p-4 md:p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 text-base md:text-lg font-bold text-ink marker:content-['']">
                  {f.q}
                  <span
                    className="shrink-0 text-xl transition-transform group-open:rotate-45"
                    style={{ color: accent }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="blog-serif mt-3 leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Autor (E-E-A-T) */}
        <aside className="mt-14 flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 md:p-6">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden="true"
          >
            PD
          </span>
          <div>
            <p className="font-bold text-ink">{post.author}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">
              Agencia de crecimiento digital en Concepción, Chile. Digitalizamos, promocionamos y
              optimizamos negocios con trayectoria usando datos y medición.{" "}
              <Link to="/" className="blog-link">
                Conócenos
              </Link>
              .
            </p>
          </div>
        </aside>

        {/* CTA de conversión */}
        <aside className="mt-10 overflow-hidden rounded-3xl bg-prisma-navy px-6 py-10 md:px-10 md:py-12 text-center text-white">
          <h2 className="blog-serif text-2xl md:text-3xl font-bold tracking-tight text-balance">
            ¿Quieres aplicar esto en tu negocio?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Agenda un diagnóstico gratis y te mostramos, con tus propios datos, dónde está tu mayor
            oportunidad de crecimiento.
          </p>
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold text-prisma-navy shadow-xl transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-agenda)" }}
          >
            Agendar diagnóstico gratis
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </aside>

        <div className="mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al blog
          </Link>
        </div>
      </article>

      {/* Relacionados */}
      <section className="mt-14 border-t border-ink/10 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="blog-serif mb-8 text-2xl font-bold tracking-tight text-ink">
            Sigue leyendo
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => {
              const rc = categoryBySlug(p.categorySlug);
              const ra = ACCENT_VAR[rc?.accent ?? "cyan"];
              return (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderTop: `3px solid ${ra}` }}
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
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: ra }}
                    >
                      {rc?.label}
                    </span>
                    <h3 className="blog-serif mt-1.5 text-lg font-bold leading-snug text-ink">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FooterNueva />
    </main>
  );
}
