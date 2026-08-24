import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/blog";

const ACCENT_VAR: Record<string, string> = {
  cyan: "var(--prisma-cyan)",
  magenta: "var(--prisma-magenta)",
  red: "var(--prisma-red)",
};

/** Parser mínimo de énfasis inline: **negrita**, `código` y [texto](enlace). */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(
        <strong key={i++} className="font-bold text-ink">
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (tok.startsWith("`")) {
      nodes.push(
        <code
          key={i++}
          className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {tok.slice(1, -1)}
        </code>,
      );
    } else {
      // [texto](url)
      const mm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok)!;
      const label = mm[1];
      const href = mm[2];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={i++}
          href={href}
          className="blog-link"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return nodes;
}

export default function BlogContent({
  body,
  accent = "cyan",
}: {
  body: Block[];
  accent?: "cyan" | "magenta" | "red";
}) {
  const color = ACCENT_VAR[accent] ?? ACCENT_VAR.cyan;
  // El primer párrafo del artículo lleva capitular.
  const firstParagraph = body.findIndex((b) => b.type === "p");

  return (
    <div className="blog-body space-y-6">
      {body.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p
                key={i}
                className={`text-ink/85 ${i === firstParagraph ? "blog-dropcap" : ""}`}
              >
                {inline(b.text)}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="blog-serif scroll-mt-28 pt-8 text-[1.7rem] md:text-3xl font-bold tracking-tight text-ink"
              >
                <span
                  className="mr-3 inline-block h-5 w-1.5 translate-y-0.5 rounded-full"
                  style={{ background: color }}
                  aria-hidden
                />
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="blog-serif pt-3 text-xl md:text-2xl font-bold text-ink">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink/85">
                    <span
                      aria-hidden
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: color }}
                    />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4 leading-relaxed text-ink/85">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white blog-serif"
                      style={{ background: color }}
                    >
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="my-8 rounded-2xl border border-ink/10 bg-white p-5 md:p-6 shadow-sm"
                style={{ borderInlineStartWidth: 4, borderInlineStartColor: color }}
              >
                <p
                  className="mb-1.5 text-xs font-bold uppercase tracking-widest"
                  style={{ color }}
                >
                  {b.title}
                </p>
                <p className="blog-serif text-lg font-medium leading-relaxed text-ink/90">
                  {inline(b.text)}
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
                <table className="w-full border-collapse text-left text-sm md:text-base">
                  <thead>
                    <tr style={{ background: color }}>
                      {b.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-bold text-white whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className={r % 2 ? "bg-ink/[0.03]" : "bg-transparent"}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border-t border-ink/10 px-4 py-3 align-top text-ink/80"
                          >
                            {inline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="blog-serif my-8 pl-6 text-xl md:text-2xl font-medium italic leading-snug text-ink/85"
                style={{ borderInlineStartWidth: 4, borderInlineStartColor: color }}
              >
                {inline(b.text)}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
