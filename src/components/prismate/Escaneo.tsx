import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CENTERS, type Mode } from "@/lib/prism/bands";
import { QUESTIONS, QUESTION_COUNT } from "@/lib/prism/questions";
import { encodeResult } from "@/lib/prism/score";
import { trackCta } from "@/components/nueva/track";

const RESULT_KEY = "prism:v2:last-result";

/** El escaneo de Prismate: 9 preguntas → tu luz dominante. Guarda el resultado
    y lleva al chat, que pasa a modo coach con tu perfil. */
export default function Escaneo() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<Mode | null>(null);
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);

  const finish = React.useCallback(
    (all: number[], m: Mode) => {
      const code = encodeResult(m, all);
      try {
        localStorage.setItem(RESULT_KEY, code);
      } catch {}
      trackCta("escaneo_completado", "prismate-escaneo");
      navigate({ to: "/prismate", hash: "habla-prismate" });
    },
    [navigate],
  );

  const pick = (optionIndex: number) => {
    if (!mode) return;
    const all = [...answers, optionIndex];
    if (all.length >= QUESTION_COUNT) {
      finish(all, mode);
      return;
    }
    setAnswers(all);
    setStep(all.length);
  };

  const back = () => {
    if (step === 0) {
      setMode(null);
      return;
    }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };

  // Paso 0: elegir camino
  if (!mode) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-prisma-cyan">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Escaneo · 9 preguntas
        </span>
        <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-white">¿Quién eres?</h2>
        <p className="mt-2 text-white/70">Para encontrar tu luz y tu nicho. Son 9 preguntas, menos de 2 minutos.</p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setMode("joven")}
            className="flex min-h-14 items-center justify-between rounded-2xl border border-white/15 bg-white/[0.03] px-5 text-left transition-colors hover:border-prisma-cyan/60"
          >
            <span>
              <span className="block font-semibold text-white">Soy persona</span>
              <span className="block text-sm text-white/55">Estoy estudiando, emprendiendo o quiero crecer</span>
            </span>
            <span aria-hidden className="text-white/40">→</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("empresa")}
            className="flex min-h-14 items-center justify-between rounded-2xl border border-white/15 bg-white/[0.03] px-5 text-left transition-colors hover:border-prisma-magenta/60"
          >
            <span>
              <span className="block font-semibold text-white">Soy empresa</span>
              <span className="block text-sm text-white/55">Tengo una marca o un negocio</span>
            </span>
            <span aria-hidden className="text-white/40">→</span>
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[mode][step];
  const progress = Math.round((step / QUESTION_COUNT) * 100);

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
      {/* Barra de progreso */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={back}
          aria-label="Atrás"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-prisma-cyan transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="shrink-0 text-xs tabular-nums text-white/50">
          {step + 1}/{QUESTION_COUNT}
        </span>
      </div>

      <h2 className="mt-6 text-xl md:text-2xl font-bold text-white text-balance">{q.prompt}</h2>

      <ul className="mt-5 flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => pick(i)}
              className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.02] px-4 py-2.5 text-left text-[15px] text-white/90 transition-colors hover:border-white/40 hover:bg-white/[0.06]"
            >
              <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: CENTERS[i].hex, boxShadow: `0 0 8px ${CENTERS[i].hex}` }} />
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
