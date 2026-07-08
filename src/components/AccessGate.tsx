import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";

/* Puerta de acceso para las herramientas internas (presentación + assessment).
   Primera instancia: credencial única compartida por el equipo, validada en el
   cliente contra hashes SHA-256 (el texto plano no viaja en el bundle).
   NOTA: es protección básica contra visitas casuales, no seguridad bancaria;
   cuando haya más usuarios conviene migrar a Firebase Auth. */

// SHA-256 de las credenciales vigentes (usuario y contraseña).
const USER_HASH = "fd183b471a9f76574691fb7568915d198d6a06db6e06664e9e84f396096cf9d0";
const PASS_HASH = "caf97f0e1b78588f3cdba840c6fd4d94fc9941de6fe9229ea616f3edbcb07549";
const STORAGE_KEY = "pd_access_ok";

async function sha256Hex(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AccessGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // La sesión dura mientras la pestaña esté abierta (sessionStorage).
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const [u, p] = await Promise.all([sha256Hex(user.trim()), sha256Hex(pass)]);
      if (u === USER_HASH && p === PASS_HASH) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setAuthed(true);
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch {
      setError("Tu navegador no soporta la validación segura. Usa una URL https o localhost.");
    }
    setBusy(false);
  };

  if (authed) return <>{children}</>;

  return (
    <main className="nl-dark fixed inset-0 overflow-y-auto text-white">
      <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="nl-aura opacity-30" />
      </div>
      <div className="relative min-h-full flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <img
            src="/Logo Prisma Digital blanco.webp"
            alt="Logo Prisma Digital"
            className="mx-auto w-40 h-auto mb-8"
          />
          <form
            onSubmit={onSubmit}
            className="nl-beam rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-8"
          >
            <div className="nl-tile-gradient mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-center text-xl font-extrabold">Acceso del equipo</h1>
            <p className="mt-1 text-center text-sm text-white/60">
              Material interno de reuniones de diagnóstico.
            </p>

            <label className="mt-6 block text-xs font-bold tracking-widest uppercase text-white/60">
              Usuario
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
                required
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base font-medium text-white placeholder-white/35 outline-none focus:border-prisma-cyan"
                placeholder="Usuario"
              />
            </label>
            <label className="mt-4 block text-xs font-bold tracking-widest uppercase text-white/60">
              Contraseña
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                required
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base font-medium text-white placeholder-white/35 outline-none focus:border-prisma-cyan"
                placeholder="••••••••••"
              />
            </label>

            {error && (
              <p className="mt-4 rounded-lg bg-prisma-red/15 px-3 py-2 text-sm font-semibold text-prisma-red">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "var(--gradient-brand)" }}
            >
              {busy ? "Verificando…" : "Entrar"}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
