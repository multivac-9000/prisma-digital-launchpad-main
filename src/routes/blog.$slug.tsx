import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Sparkles, HelpCircle } from "lucide-react";
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
  postUrl,
  postCover,
  postCoverAbsolute,
  wordCount,
  SITE,
  posts,
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
        { title: post.title },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "robots", content: "index, follow" },
        { name: "author", content: post.author },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:url", content: url },
        { property: "og:image", content: cover },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: post.coverAlt },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: post.dateModified },
        { property: "article:section", content: cat?.label ?? "Blog" },
        { name: "twitter:title", content: post.title },
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <Navbar />
        <h1 className="text-2xl font-bold text-ink">Artículo no encontrado</h1>
        <Link to="/blog" className="mt-4 font-semibold text-prisma-magenta">
          Volver al blog
        </Link>
      </main>
    );
  }

  const cat = categoryBySlug(post.categorySlug);
  const accent = ACCENT_VAR[cat?.accent ?? "cyan"];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Encabezado */}
      <header
        className="relative overflow-hidden px-6 pt-32 pb-14 md:pt-40 md:pb-16 text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="hero-aura" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5 list-none">
              <li>
                <Link to="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white/85">{cat?.label}</li>
            </ol>
          </nav>

          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
            style={{ background: accent }}
          >
            {cat?.label}
          </span>

          <h1 className="mt-4 text-balance text-3xl md:text-5xl font-extrabold leading-[1.08] tracking-tight">
            {post.title}
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-white/75">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            <span>{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {dateFmt(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingMinutes} min de lectura
            </span>
          </div>
        </div>
      </header>

      {/* Cuerpo */}
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Portada */}
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
          className="mb-10 rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 md:p-6"
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
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ink/85">
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
        <section aria-labelledby="faq-title" className="mt-14">
          <h2
            id="faq-title"
            className="mb-5 inline-flex items-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-ink"
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
                <p className="mt-3 text-base leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA de conversión */}
        <aside className="mt-14 overflow-hidden rounded-3xl bg-prisma-navy px-6 py-10 md:px-10 md:py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
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

        {/* Volver */}
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
      <section className="border-t border-ink/10 bg-ink/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">Sigue leyendo</h2>
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
                      className="mb-2 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                      style={{ background: ra }}
                    >
                      {rc?.label}
                    </span>
                    <h3 className="text-base font-bold leading-snug text-ink">{p.title}</h3>
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
