import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/blog";

const ACCENT_VAR: Record<string, string> = {
  cyan: "var(--prisma-cyan)",
  magenta: "var(--prisma-magenta)",
  red: "var(--prisma-red)",
};

/** Parser mínimo de énfasis inline: **negrita** y `código`. */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
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
    } else {
      nodes.push(
        <code
          key={i++}
          className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {tok.slice(1, -1)}
        </code>,
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

  return (
    <div className="space-y-5">
      {body.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-base md:text-lg leading-relaxed text-ink/80">
                {inline(b.text)}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="scroll-mt-28 pt-6 text-2xl md:text-3xl font-extrabold tracking-tight text-ink"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-lg md:text-xl font-bold text-ink">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-base md:text-lg leading-relaxed text-ink/80">
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
              <ol key={i} className="space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3.5 text-base md:text-lg leading-relaxed text-ink/80">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
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
                className="my-6 rounded-2xl border border-ink/10 bg-ink/[0.03] p-5 md:p-6"
                style={{ borderInlineStartWidth: 4, borderInlineStartColor: color }}
              >
                <p
                  className="mb-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color }}
                >
                  {b.title}
                </p>
                <p className="text-base md:text-lg font-medium leading-relaxed text-ink/90">
                  {inline(b.text)}
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-ink/10">
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
                className="my-6 pl-5 text-lg md:text-xl font-medium italic text-ink/85"
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
