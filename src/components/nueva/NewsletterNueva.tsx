import BrevoForm from "../BrevoForm";

// Misma acción de formulario que BrevoNewsletter (misma lista de Brevo), pero con
// un incentivo concreto para suscribirse: 1 caso real al mes. Un solo campo: email.
// Layout horizontal: copy a la izquierda, input + botón a la derecha (se apilan en móvil).
const NEWSLETTER_HTML = `
<style>
  #sib-container { background: transparent !important; border: none !important; padding: 0 !important; max-width: 100% !important; text-align: left !important; }
  .nlx-wrap { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
  .nlx-copy { flex: 1 1 300px; min-width: 240px; }
  .nlx-form { flex: 1 1 360px; min-width: 260px; }
  .nlx-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .nlx-row .entry__field { flex: 1 1 200px; margin: 0; }
  .nlx-row .sib-form-block__button { white-space: nowrap; margin: 0; }
  .sib-form-block, .sib-input { padding: 0 !important; }
  .form__entry { margin: 0 !important; }
</style>
<div class="sib-form" style="text-align: left; background-color: transparent; padding: 0;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:14px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; margin:0 0 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" /></svg>
        <span class="sib-form-message-panel__inner-text">No hemos podido validar su suscripción.</span>
      </div>
    </div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:14px; text-align:left; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; margin:0 0 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" /></svg>
        <span class="sib-form-message-panel__inner-text">Se ha realizado su suscripción.</span>
      </div>
    </div>
    <div id="sib-container" class="sib-container--large">
      <div class="nlx-wrap">
        <div class="nlx-copy">
          <p style="font-family:Futura, sans-serif; font-size:20px; font-weight:700; color:#fcfeff; margin:0 0 6px;">1 caso real al mes</p>
          <p style="font-family:Helvetica, sans-serif; font-size:14px; line-height:1.5; color:rgba(255,255,255,0.7); margin:0;">Qué hizo, qué midió y qué resultado obtuvo una empresa que mejoró sus números digitales.</p>
        </div>
        <form id="sib-form" method="POST" action="https://345b4d6b.sibforms.com/serve/MUIFAN_Ng8yAMpFy0s-a9kNPr0q_DvozZJp2n-wS7f2_qGo7lq86UoJngwF8dUYM48NJKyqu80nKOeekIcBA_4yHMOx4wXD96ga2bQjBVfCgGj3r3K2-d3LsDnA_knMKhAxuOTN8VK0kTxYqPBa_MZ3u3nsMx8Uv1Ih38RQJ7qMuHXYWKVt99-U8kMCaD96Eup6x69oTx0glTVPi" data-type="subscription" class="nlx-form">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="nlx-row">
                <div class="entry__field"><input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" value="" placeholder="tucorreo@empresa.cl" aria-label="Tu email" data-required="true" required /></div>
                <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-family:Futura, sans-serif; font-size:14px; font-weight:700; color:#FFFFFF; background-color:#d713f9; border-width:0px; border-radius:10px; padding:10px 18px;" form="sib-form" type="submit">
                  <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512"><path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" /></svg>
                  QUIERO EL CASO DEL MES
                </button>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:14px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__specification" style="display:block; margin-top:6px; font-family:Helvetica, sans-serif; font-size:11px; text-align:left; color:rgba(255,255,255,0.55);">Tus datos están a salvo con nosotros. Sin spam.</label>
            </div>
          </div>
          <input type="text" name="email_address_check" value="" class="input--hidden">
          <input type="hidden" name="locale" value="es">
        </form>
      </div>
    </div>
  </div>
</div>
`;

export default function NewsletterNueva() {
  return <BrevoForm html={NEWSLETTER_HTML} title="Newsletter Prisma Digital" initialHeight={120} />;
}
