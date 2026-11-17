import * as React from "react";
import { Send, Sparkles, CalendarDays } from "lucide-react";
import { askPrismate } from "@/lib/api/prismate.functions";
import { trackCta } from "@/components/nueva/track";

const MEET_URL = "https://meet.brevo.com/prisma-digital";
const SID_KEY = "prismate:sid";

const SUGERENCIAS = [
  "¿Qué hace Prisma Digital?",
  "¿Cómo miden resultados?",
  "Quiero bajar mi CPA",
  "¿Tienen casos de éxito?",
];

const BIENVENIDA =
  "¡Hola! Soy **Prismate**, el asistente de Prisma Digital. Ayudamos a negocios con trayectoria a **duplicar sus ventas online** midiendo lo que importa. Cuéntame de tu negocio o pregúntame lo que quieras. 👇";

type Msg = { from: "prismate" | "tu"; text: string };

/** Avatar: un pequeño prisma con el espectro de la marca. */
function PrismateAvatar({ size = 36, talking = false }: { size?: number; talking?: boolean }) {
  return (
    <span
      aria-hidden
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size }}
    >
      <span
        className={`absolute inset-[-20%] rounded-full blur-md transition-opacity duration-500 ${talking ? "opacity-80" : "opacity-45"}`}
        style={{ background: "conic-gradient(#fd3833,#fecd2b,#32d6ff,#d713f9,#fd3833)" }}
      />
      <span className="absolute inset-0 rounded-full bg-[#05061e]" />
      <svg viewBox="0 0 40 40" width={size * 0.72} height={size * 0.72} className="relative">
        <defs>
          <linearGradient id="pm-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#fd3833" />
            <stop offset="0.5" stopColor="#32d6ff" />
            <stop offset="1" stopColor="#d713f9" />
          </linearGradient>
        </defs>
        <path
          d="M20 5 5 33h30L20 5Z"
          fill="rgba(255,255,255,0.06)"
          stroke="url(#pm-grad)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Render ligero: **negritas**, enlaces y saltos de línea. Nada de HTML del modelo. */
function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**"))
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            if (/^https?:\/\//.test(part))
              return (
                <a
                  key={i}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-prisma-cyan underline underline-offset-2 break-all"
                >
                  {part.replace(/^https?:\/\//, "")}
                </a>
              );
            return <span key={i}>{part}</span>;
          })}
        </React.Fragment>
      ))}
    </>
  );
}

export default function PrismateChat() {
  const [msgs, setMsgs] = React.useState<Msg[]>([{ from: "prismate", text: BIENVENIDA }]);
  const [draft, setDraft] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const logRef = React.useRef<HTMLOListElement>(null);
  const sidRef = React.useRef<string>("");

  // Sesión estable por visitante (memoria del agente en n8n).
  React.useEffect(() => {
    let sid = "";
    try {
      sid = localStorage.getItem(SID_KEY) || "";
    } catch {}
    if (!sid) {
      const rnd =
        (globalThis.crypto && "randomUUID" in globalThis.crypto
          ? globalThis.crypto.randomUUID()
          : Math.random().toString(36).slice(2)) + Date.now().toString(36);
      sid = `web-${rnd}`;
      try {
        localStorage.setItem(SID_KEY, sid);
      } catch {}
    }
    sidRef.current = sid;
  }, []);

  React.useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = React.useCallback(
    async (texto: string) => {
      const t = texto.trim();
      if (!t || busy) return;
      setDraft("");
      setError("");
      setMsgs((m) => [...m, { from: "tu", text: t }]);
      setBusy(true);
      if (sidRef.current) {
        // Primer mensaje del visitante: marca interacción con el chat.
        trackCta("prismate_mensaje", "prismate-chat");
      }
      try {
        const r = await askPrismate({ data: { message: t, sessionId: sidRef.current || "web-anon" } });
        if (r.ok) setMsgs((m) => [...m, { from: "prismate", text: r.reply }]);
        else setError(r.msg);
      } catch {
        setError("No se pudo contactar al asistente. Intenta de nuevo.");
      } finally {
        setBusy(false);
      }
    },
    [busy],
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] shadow-2xl backdrop-blur-sm">
      {/* Encabezado */}
      <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <PrismateAvatar size={40} talking={busy} />
        <span>
          <span className="block text-base font-bold text-white">Prismate</span>
          <span className="block text-xs text-white/55">
            {busy ? "Escribiendo…" : "Asistente de Prisma Digital"}
          </span>
        </span>
        <a
          href={MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCta("agendar_diagnostico", "prismate-chat-header")}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-prisma-navy shadow-md transition-transform hover:scale-[1.03]"
          style={{ background: "var(--gradient-agenda)" }}
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Agendar</span>
        </a>
      </header>

      {/* Conversación */}
      <ol
        ref={logRef}
        className="flex max-h-[46dvh] min-h-[280px] flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-5"
        aria-live="polite"
      >
        {msgs.map((m, i) => (
          <li
            key={i}
            className={
              m.from === "tu"
                ? "max-w-[85%] self-end rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[15px] font-medium text-prisma-navy"
                : "flex max-w-[92%] items-start gap-2.5 self-start"
            }
          >
            {m.from === "prismate" && <PrismateAvatar size={28} />}
            {m.from === "prismate" ? (
              <span className="rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-2.5 text-[15px] leading-relaxed text-white/90">
                <Rich text={m.text} />
              </span>
            ) : (
              m.text
            )}
          </li>
        ))}
        {busy && (
          <li className="flex items-center gap-2.5 self-start">
            <PrismateAvatar size={28} talking />
            <span className="flex gap-1 rounded-2xl bg-white/[0.07] px-4 py-3.5" aria-label="Escribiendo">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </li>
        )}
      </ol>

      {/* Sugerencias (solo al inicio) */}
      {msgs.length <= 1 && !busy && (
        <div className="flex flex-wrap gap-2 px-5 pb-1">
          {SUGERENCIAS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[13px] text-white/80 transition-colors hover:border-prisma-cyan/60 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-prisma-cyan" aria-hidden="true" />
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="px-5 pt-2 text-sm text-prisma-red">
          {error}
        </p>
      )}

      {/* Entrada */}
      <form
        className="flex items-end gap-2 px-4 pb-4 pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <label htmlFor="prismate-input" className="sr-only">
          Escríbele a Prismate
        </label>
        <textarea
          id="prismate-input"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(draft);
            }
          }}
          maxLength={2000}
          placeholder="Escríbele a Prismate…"
          className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl border border-white/15 bg-[#05061e]/60 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-prisma-cyan/60"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Enviar"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-prisma-navy transition-transform hover:scale-105 disabled:opacity-40"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
