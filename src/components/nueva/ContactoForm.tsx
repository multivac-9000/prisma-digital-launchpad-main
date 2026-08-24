import { trackCta } from "./track";
import { useMagnetic } from "./scrolly";

// Endpoint del formulario de Brevo (lista "LEADS WEB"). El POST nativo del
// navegador navega a Brevo, que procesa y redirige a /gracias-infinitas
// (configurado en el propio formulario de Brevo). Al ser navegación de página
// completa, el evento generate_lead de gracias-infinitas se dispara normal.
const BREVO_ACTION =
  "https://345b4d6b.sibforms.com/serve/MUIFAOVc3B9AWrtg9aM3CAvHScKfp8Ak5Rg3dGgrxrEwFJIdkmi60NP7IEJrxFUR9tuLZsDhfXvfrCdRrsqLYjJxZYg_O6AojNgMU_Eu7jMC4bdABeY2DHZvs65w2JoPPGDcIH6PhFxLeZP72pp_-2xS4iB2b6UveyK2l5Gl3ohVxLeSlTYMIhXkFyzaPy5Wz51z3GVfilH97YmQ";

// Códigos de país frecuentes (Chile por defecto). Brevo recibe SMS__COUNTRY_CODE
// + SMS y los combina en su backend, igual que en su propio markup.
const COUNTRY_CODES: { value: string; label: string }[] = [
  { value: "+56", label: "🇨🇱 +56" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+51", label: "🇵🇪 +51" },
  { value: "+57", label: "🇨🇴 +57" },
  { value: "+52", label: "🇲🇽 +52" },
  { value: "+598", label: "🇺🇾 +598" },
  { value: "+593", label: "🇪🇨 +593" },
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+1", label: "🇺🇸 +1" },
];

// Sin `w-full` en la base: cada campo declara su ancho (el select del código de
// país necesita ancho fijo y el resto ancho completo).
const inputBase =
  "rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 px-4 py-3.5 text-base outline-none transition-colors focus:border-prisma-cyan focus:ring-2 focus:ring-prisma-cyan/25";

export default function ContactoForm() {
  const btnRef = useMagnetic<HTMLButtonElement>(160, 10);

  return (
    <form
      method="POST"
      action={BREVO_ACTION}
      onSubmit={() => trackCta("enviar_formulario_contacto", "contacto")}
      className="flex flex-col gap-4"
    >
      {/* Nombre */}
      <div>
        <label htmlFor="NOMBRE" className="sr-only">
          Nombre
        </label>
        <input
          id="NOMBRE"
          name="NOMBRE"
          type="text"
          maxLength={200}
          required
          autoComplete="name"
          placeholder="Nombre"
          className={`${inputBase} w-full`}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="EMAIL" className="sr-only">
          Email
        </label>
        <input
          id="EMAIL"
          name="EMAIL"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={`${inputBase} w-full`}
        />
      </div>

      {/* Sitio web (opcional) */}
      <div>
        <label htmlFor="SITIO_WEB" className="sr-only">
          Tu sitio web
        </label>
        <input
          id="SITIO_WEB"
          name="SITIO_WEB"
          type="text"
          maxLength={200}
          autoComplete="url"
          placeholder="Tu sitio web (opcional)"
          className={`${inputBase} w-full`}
        />
      </div>

      {/* WhatsApp: código de país + número */}
      <div>
        <label htmlFor="SMS" className="sr-only">
          WhatsApp
        </label>
        <div className="flex gap-2">
          <select
            name="SMS__COUNTRY_CODE"
            defaultValue="+56"
            aria-label="Código de país"
            className={`${inputBase} w-24 shrink-0 appearance-none text-center`}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.value} value={c.value} className="text-ink">
                {c.label}
              </option>
            ))}
          </select>
          <input
            id="SMS"
            name="SMS"
            type="tel"
            required
            autoComplete="tel"
            placeholder="WhatsApp"
            className={`${inputBase} flex-1 min-w-0`}
          />
        </div>
      </div>

      {/* Mensaje (mapea al atributo APELLIDOS en Brevo) */}
      <div>
        <label htmlFor="APELLIDOS" className="sr-only">
          Mensaje
        </label>
        <textarea
          id="APELLIDOS"
          name="APELLIDOS"
          rows={3}
          maxLength={500}
          required
          placeholder="Cuéntanos qué necesita tu negocio"
          className={`${inputBase} w-full resize-y min-h-[96px]`}
        />
      </div>

      {/* Honeypot anti-bot de Brevo: debe quedar vacío. Oculto accesiblemente. */}
      <input
        type="text"
        name="email_address_check"
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <input type="hidden" name="locale" value="es" />

      <button
        ref={btnRef}
        type="submit"
        className="nl-shine mt-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-[0_12px_36px_-8px_rgba(253,56,51,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{
          background:
            "linear-gradient(135deg, #ff7a68 0%, var(--prisma-red, #fd3833) 45%, #b8110f 100%)",
          boxShadow: "0 8px 28px -10px rgba(253, 56, 51, 0.55)",
        }}
      >
        Enviar mensaje
      </button>

      <p className="text-xs leading-relaxed text-white/50">
        Al enviar aceptas que Prisma Digital te contacte y trate tus datos según nuestra{" "}
        <a href="/politica-de-privacidad" className="underline hover:text-white/80">
          Política de Privacidad
        </a>
        . Sin spam: solo te escribimos por lo que nos consultaste.
      </p>
    </form>
  );
}
