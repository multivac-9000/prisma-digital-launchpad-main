import { useEffect } from "react";

// CSS que Brevo recomienda colocar en el <head>. Lo inyectamos una sola vez.
const BREVO_STYLE = `
@font-face {
  font-display: block;
  font-family: Roboto;
  src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff");
}
@font-face {
  font-display: fallback;
  font-family: Roboto;
  font-weight: 600;
  src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff");
}
@font-face {
  font-display: fallback;
  font-family: Roboto;
  font-weight: 700;
  src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff");
}
:where(.sib-form-message-panel) { display: none; }
:where(.sib-form-message-panel .sib-notification__icon) { width: 20px; height: 20px; }
#sib-container input:-ms-input-placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container input::placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container textarea::placeholder { font-family: Helvetica, sans-serif; text-align: left; color: #c0ccda; }
#sib-container a { text-decoration: underline; color: #2BB2FC; }
/* El formulario Brevo se centra y ocupa todo el ancho disponible (hasta su max-width) */
.sib-form { padding: 0 !important; }
.sib-form .sib-form-container { width: 100%; }
.sib-form #sib-container { width: 100%; }
`;

// Markup del formulario tal cual lo entrega Brevo (modo HTML).
const FORM_HTML = `
<div class="sib-form" style="text-align: center; background-color: transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; max-width:540px; margin:0 auto 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">No hemos podido validar su suscripción.</span>
      </div>
    </div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; max-width:540px; margin:0 auto 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">Se ha realizado su suscripción.</span>
      </div>
    </div>
    <div id="sib-container" class="sib-container--large sib-container--vertical" style="max-width:540px; margin:0 auto; text-align:center; background-color:rgba(0,1,57,1); border-width:1px; border-style:solid; border-color:#d713f9; border-radius:5px; direction:ltr">
      <form id="sib-form" method="POST" action="https://345b4d6b.sibforms.com/serve/MUIFAN_Ng8yAMpFy0s-a9kNPr0q_DvozZJp2n-wS7f2_qGo7lq86UoJngwF8dUYM48NJKyqu80nKOeekIcBA_4yHMOx4wXD96ga2bQjBVfCgGj3r3K2-d3LsDnA_knMKhAxuOTN8VK0kTxYqPBa_MZ3u3nsMx8Uv1Ih38RQJ7qMuHXYWKVt99-U8kMCaD96Eup6x69oTx0glTVPi" data-type="subscription">
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="font-family:Futura, sans-serif; font-size:32px; font-weight:700; text-align:left; color:#fcfeff; background-color:transparent;">
            <p>Newsletter Digital</p>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#ffffff; background-color:transparent;">
            <div class="sib-text-form-block">
              <p>Suscríbete a nuestra newsletter para recibir novedades sobre optimización y marketing digital.</p>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight: 700; text-align: left; font-family:Futura, sans-serif; font-size:16px; color:#fafcfd;" for="EMAIL" data-required="*">Introduzca su dirección de e-mail para suscribirse</label>
                <div class="entry__field">
                  <input class="input " type="text" id="EMAIL" name="EMAIL" autocomplete="off" value="" placeholder="EMAIL" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__specification" style="font-family:Helvetica, sans-serif; font-size:12px; text-align:left; color:#d8f40a;">Tus datos están a salvo con nosotros</label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align: left">
            <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-family:Futura, sans-serif; font-size:16px; font-weight:700; text-align:left; color:#FFFFFF; background-color:#d713f9; border-width:0px; border-radius:10px;" form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
              </svg>
              SUSCRIBIRSE
            </button>
          </div>
        </div>
        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="es">
      </form>
    </div>
  </div>
</div>
`;

export default function BrevoNewsletter() {
  useEffect(() => {
    // 1) Config global que espera el script de Brevo (validación / i18n).
    const w = window as unknown as Record<string, unknown>;
    w.REQUIRED_CODE_ERROR_MESSAGE = "Elige un código de país";
    w.LOCALE = "es";
    w.EMAIL_INVALID_MESSAGE = w.SMS_INVALID_MESSAGE =
      "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
    w.REQUIRED_ERROR_MESSAGE = "Este campo no puede quedarse vacío. ";
    w.GENERIC_INVALID_MESSAGE =
      "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
    w.INVALID_NUMBER =
      "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
    w.INVALID_DATE = "Introduce una fecha válida";
    w.REQUIRED_MULTISELECT_MESSAGE = "Selecciona al menos una opción";
    w.translation = {
      common: {
        selectedList: "{quantity} lista seleccionada",
        selectedLists: "{quantity} listas seleccionadas",
        selectedOption: "{quantity} seleccionado",
        selectedOptions: "{quantity} seleccionados",
      },
    };
    w.AUTOHIDE = false;

    // 2) Estilos personalizados (una sola vez).
    if (!document.getElementById("brevo-custom-style")) {
      const style = document.createElement("style");
      style.id = "brevo-custom-style";
      style.textContent = BREVO_STYLE;
      document.head.appendChild(style);
    }

    // 3) Hoja de estilos oficial de Brevo (una sola vez).
    if (!document.getElementById("brevo-sib-styles")) {
      const link = document.createElement("link");
      link.id = "brevo-sib-styles";
      link.rel = "stylesheet";
      link.href = "https://sibforms.com/forms/end-form/build/sib-styles.css";
      document.head.appendChild(link);
    }

    // 4) Script que activa el formulario (envío AJAX + validación).
    //    Se agrega después de montar el form para que lo encuentre en el DOM.
    if (!document.getElementById("brevo-main-js")) {
      const script = document.createElement("script");
      script.id = "brevo-main-js";
      script.defer = true;
      script.src = "https://sibforms.com/forms/end-form/build/main.js";
      document.body.appendChild(script);
    }
  }, []);

  return <div className="w-full" dangerouslySetInnerHTML={{ __html: FORM_HTML }} />;
}
