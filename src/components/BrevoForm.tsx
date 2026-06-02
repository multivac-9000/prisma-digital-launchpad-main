import { useEffect, useMemo, useRef, useState } from "react";

// Estilos que Brevo recomienda. Se inyectan dentro del documento aislado del iframe.
const BREVO_STYLE = `
@font-face { font-display: block; font-family: Roboto; src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff"); }
@font-face { font-display: fallback; font-family: Roboto; font-weight: 600; src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff"); }
@font-face { font-display: fallback; font-family: Roboto; font-weight: 700; src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff"); }
:where(.sib-form-message-panel) { display: none; }
:where(.sib-form-message-panel .sib-notification__icon) { width: 20px; height: 20px; }
#sib-container input:-ms-input-placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container input::placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container textarea::placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container a { text-decoration: underline; color: #2BB2FC; }
html, body { margin: 0; padding: 0; background: transparent; }
.sib-form { padding: 0 !important; }
.sib-form, .sib-form-container, #sib-container { width: 100% !important; }
#sib-container { margin: 0 auto !important; }
`;

// Config global que espera el script de Brevo (i18n / validación).
const WINDOW_CONFIG = `
  window.REQUIRED_CODE_ERROR_MESSAGE = 'Elige un código de país';
  window.LOCALE = 'es';
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
  window.REQUIRED_ERROR_MESSAGE = "Este campo no puede quedarse vacío. ";
  window.GENERIC_INVALID_MESSAGE = "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
  window.INVALID_NUMBER = "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
  window.INVALID_DATE = "Introduce una fecha válida";
  window.REQUIRED_MULTISELECT_MESSAGE = 'Selecciona al menos una opción';
  window.translation = { common: { selectedList: '{quantity} lista seleccionada', selectedLists: '{quantity} listas seleccionadas', selectedOption: '{quantity} seleccionado', selectedOptions: '{quantity} seleccionados' } };
  var AUTOHIDE = Boolean(0);
`;

// Mide el contenido y reporta su alto al documento padre para que ajuste el iframe.
const RESIZE_SCRIPT = `
  (function () {
    function postHeight() {
      var h = Math.ceil(document.body.getBoundingClientRect().height);
      if (h > 0) parent.postMessage({ __brevoResize: true, height: h }, '*');
    }
    function start() {
      postHeight();
      if (window.ResizeObserver) { new ResizeObserver(postHeight).observe(document.body); }
      var n = 0, iv = setInterval(function () { postHeight(); if (++n > 25) clearInterval(iv); }, 250);
    }
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);
    window.addEventListener('resize', postHeight);
  })();
`;

function buildSrcDoc(formHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css" />
<style>${BREVO_STYLE}</style>
</head>
<body>
${formHtml}
<script>${WINDOW_CONFIG}</script>
<script defer src="https://sibforms.com/forms/end-form/build/main.js"></script>
<script>${RESIZE_SCRIPT}</script>
</body>
</html>`;
}

type BrevoFormProps = {
  /** Markup del formulario tal cual lo entrega Brevo (modo HTML). */
  html: string;
  /** Texto accesible del iframe. */
  title: string;
  /** Alto inicial en px antes de auto-ajustar (evita salto visual). */
  initialHeight?: number;
};

export default function BrevoForm({ html, title, initialHeight = 420 }: BrevoFormProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const srcDoc = useMemo(() => buildSrcDoc(html), [html]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data as { __brevoResize?: boolean; height?: number } | null;
      if (!data || !data.__brevoResize || typeof data.height !== "number") return;
      if (ref.current && e.source === ref.current.contentWindow) {
        setHeight(data.height);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={srcDoc}
      scrolling="no"
      className="block w-full border-0"
      style={{ width: "100%", height }}
    />
  );
}
