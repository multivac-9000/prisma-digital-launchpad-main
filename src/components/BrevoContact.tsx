import BrevoForm from "./BrevoForm";

// Prefijos telefónicos (valor, ISO) en el mismo orden que entrega Brevo.
const COUNTRIES: [string, string][] = [
  ["+93", "AF"],
  ["+358", "AX"],
  ["+355", "AL"],
  ["+213", "DZ"],
  ["+1684", "AS"],
  ["+376", "AD"],
  ["+244", "AO"],
  ["+1264", "AI"],
  ["+672", "AQ"],
  ["+1268", "AG"],
  ["+54", "AR"],
  ["+374", "AM"],
  ["+297", "AW"],
  ["+61", "AU"],
  ["+43", "AT"],
  ["+994", "AZ"],
  ["+1242", "BS"],
  ["+973", "BH"],
  ["+880", "BD"],
  ["+1246", "BB"],
  ["+375", "BY"],
  ["+32", "BE"],
  ["+501", "BZ"],
  ["+229", "BJ"],
  ["+1441", "BM"],
  ["+975", "BT"],
  ["+591", "BO"],
  ["+599", "BQ"],
  ["+387", "BA"],
  ["+267", "BW"],
  ["+47", "BV"],
  ["+55", "BR"],
  ["+246", "IO"],
  ["+673", "BN"],
  ["+359", "BG"],
  ["+226", "BF"],
  ["+257", "BI"],
  ["+855", "KH"],
  ["+237", "CM"],
  ["+1", "CA"],
  ["+34", "IC"],
  ["+238", "CV"],
  ["+1345", "KY"],
  ["+236", "CF"],
  ["+34", "EA"],
  ["+235", "TD"],
  ["+56", "CL"],
  ["+86", "CN"],
  ["+61", "CX"],
  ["+61", "CC"],
  ["+57", "CO"],
  ["+269", "KM"],
  ["+242", "CG"],
  ["+243", "CD"],
  ["+682", "CK"],
  ["+506", "CR"],
  ["+225", "CI"],
  ["+385", "HR"],
  ["+53", "CU"],
  ["+599", "CW"],
  ["+357", "CY"],
  ["+420", "CZ"],
  ["+45", "DK"],
  ["+253", "DJ"],
  ["+1767", "DM"],
  ["+1809", "DO"],
  ["+1829", "DO"],
  ["+1849", "DO"],
  ["+593", "EC"],
  ["+20", "EG"],
  ["+503", "SV"],
  ["+240", "GQ"],
  ["+291", "ER"],
  ["+372", "EE"],
  ["+251", "ET"],
  ["+500", "FK"],
  ["+298", "FO"],
  ["+679", "FJ"],
  ["+358", "FI"],
  ["+33", "FR"],
  ["+594", "GF"],
  ["+689", "PF"],
  ["+262", "TF"],
  ["+241", "GA"],
  ["+220", "GM"],
  ["+995", "GE"],
  ["+49", "DE"],
  ["+233", "GH"],
  ["+350", "GI"],
  ["+30", "GR"],
  ["+299", "GL"],
  ["+1473", "GD"],
  ["+590", "GP"],
  ["+1671", "GU"],
  ["+502", "GT"],
  ["+44", "GG"],
  ["+224", "GN"],
  ["+245", "GW"],
  ["+592", "GY"],
  ["+509", "HT"],
  ["+672", "HM"],
  ["+379", "VA"],
  ["+504", "HN"],
  ["+852", "HK"],
  ["+36", "HU"],
  ["+354", "IS"],
  ["+91", "IN"],
  ["+62", "ID"],
  ["+98", "IR"],
  ["+964", "IQ"],
  ["+353", "IE"],
  ["+44", "IM"],
  ["+972", "IL"],
  ["+39", "IT"],
  ["+1876", "JM"],
  ["+81", "JP"],
  ["+44", "JE"],
  ["+962", "JO"],
  ["+7", "KZ"],
  ["+254", "KE"],
  ["+686", "KI"],
  ["+850", "KP"],
  ["+82", "KR"],
  ["+965", "KW"],
  ["+996", "KG"],
  ["+856", "LA"],
  ["+371", "LV"],
  ["+961", "LB"],
  ["+266", "LS"],
  ["+231", "LR"],
  ["+218", "LY"],
  ["+423", "LI"],
  ["+370", "LT"],
  ["+352", "LU"],
  ["+853", "MO"],
  ["+389", "MK"],
  ["+261", "MG"],
  ["+265", "MW"],
  ["+60", "MY"],
  ["+960", "MV"],
  ["+223", "ML"],
  ["+356", "MT"],
  ["+692", "MH"],
  ["+596", "MQ"],
  ["+222", "MR"],
  ["+230", "MU"],
  ["+262", "YT"],
  ["+52", "MX"],
  ["+691", "FM"],
  ["+373", "MD"],
  ["+377", "MC"],
  ["+976", "MN"],
  ["+382", "ME"],
  ["+1664", "MS"],
  ["+212", "MA"],
  ["+258", "MZ"],
  ["+95", "MM"],
  ["+264", "NA"],
  ["+674", "NR"],
  ["+977", "NP"],
  ["+31", "NL"],
  ["+687", "NC"],
  ["+64", "NZ"],
  ["+505", "NI"],
  ["+227", "NE"],
  ["+234", "NG"],
  ["+683", "NU"],
  ["+672", "NF"],
  ["+1670", "MP"],
  ["+47", "NO"],
  ["+968", "OM"],
  ["+92", "PK"],
  ["+680", "PW"],
  ["+970", "PS"],
  ["+507", "PA"],
  ["+675", "PG"],
  ["+595", "PY"],
  ["+51", "PE"],
  ["+63", "PH"],
  ["+64", "PN"],
  ["+48", "PL"],
  ["+351", "PT"],
  ["+1787", "PR"],
  ["+974", "QA"],
  ["+383", "XK"],
  ["+262", "RE"],
  ["+40", "RO"],
  ["+7", "RU"],
  ["+250", "RW"],
  ["+590", "BL"],
  ["+290", "SH"],
  ["+1869", "KN"],
  ["+1758", "LC"],
  ["+590", "MF"],
  ["+508", "PM"],
  ["+1784", "VC"],
  ["+685", "WS"],
  ["+378", "SM"],
  ["+239", "ST"],
  ["+966", "SA"],
  ["+221", "SN"],
  ["+381", "RS"],
  ["+248", "SC"],
  ["+232", "SL"],
  ["+65", "SG"],
  ["+1721", "SX"],
  ["+421", "SK"],
  ["+386", "SI"],
  ["+677", "SB"],
  ["+252", "SO"],
  ["+27", "ZA"],
  ["+500", "GS"],
  ["+211", "SS"],
  ["+34", "ES"],
  ["+94", "LK"],
  ["+249", "SD"],
  ["+597", "SR"],
  ["+47", "SJ"],
  ["+268", "SZ"],
  ["+46", "SE"],
  ["+41", "CH"],
  ["+963", "SY"],
  ["+886", "TW"],
  ["+992", "TJ"],
  ["+255", "TZ"],
  ["+66", "TH"],
  ["+670", "TL"],
  ["+228", "TG"],
  ["+690", "TK"],
  ["+676", "TO"],
  ["+1868", "TT"],
  ["+216", "TN"],
  ["+90", "TR"],
  ["+993", "TM"],
  ["+1649", "TC"],
  ["+688", "TV"],
  ["+256", "UG"],
  ["+380", "UA"],
  ["+971", "AE"],
  ["+44", "GB"],
  ["+1", "US"],
  ["+246", "UM"],
  ["+598", "UY"],
  ["+998", "UZ"],
  ["+678", "VU"],
  ["+58", "VE"],
  ["+84", "VN"],
  ["+1284", "VG"],
  ["+1340", "VI"],
  ["+681", "WF"],
  ["+212", "EH"],
  ["+967", "YE"],
  ["+260", "ZM"],
  ["+263", "ZW"],
];

const COUNTRY_OPTIONS = COUNTRIES.map(
  ([code, iso]) => `<option value="${code}">${code} ${iso}</option>`,
).join("");

// Formulario de contacto (modo HTML de Brevo), aislado en su propio iframe srcdoc.
const CONTACT_HTML = `
<div class="sib-form" style="text-align: center; background-color: transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; max-width:540px; margin:0 auto 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" /></svg>
        <span class="sib-form-message-panel__inner-text">No hemos podido validar su Solicitud.</span>
      </div>
    </div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:center; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; max-width:540px; margin:0 auto 8px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" /></svg>
        <span class="sib-form-message-panel__inner-text">Se ha realizado tu Solicitud.</span>
      </div>
    </div>
    <div id="sib-container" class="sib-container--large sib-container--horizontal" style="max-width:540px; margin:0 auto; text-align:center; background-color:rgba(0,1,57,1); border-width:0px; border-style:solid; border-color:#C0CCD9; border-radius:9px; direction:ltr">
      <form id="sib-form" method="POST" action="https://345b4d6b.sibforms.com/serve/MUIFAOVc3B9AWrtg9aM3CAvHScKfp8Ak5Rg3dGgrxrEwFJIdkmi60NP7IEJrxFUR9tuLZsDhfXvfrCdRrsqLYjJxZYg_O6AojNgMU_Eu7jMC4bdABeY2DHZvs65w2JoPPGDcIH6PhFxLeZP72pp_-2xS4iB2b6UveyK2l5Gl3ohVxLeSlTYMIhXkFyzaPy5Wz51z3GVfilH97YmQ" data-type="subscription">
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row  form__label-row--horizontal "><div class="entry__field"><input class="input " maxlength="200" type="text" id="NOMBRE" name="NOMBRE" autocomplete="off" placeholder="Nombre" data-required="true" required /></div></div><label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label></div></div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row  form__label-row--horizontal "><div class="entry__field"><input class="input " type="text" id="EMAIL" name="EMAIL" autocomplete="off" value="" placeholder="E-mail" data-required="true" required /></div></div><label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label></div></div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row  form__label-row--horizontal "><div class="entry__field"><input class="input " maxlength="200" type="text" id="SITIO_WEB" name="SITIO_WEB" autocomplete="off" placeholder="Tu sitio web" /></div></div><label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label></div></div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-sms-field sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="sib-sms-input-wrapper" style="direction:ltr">
                  <div class="sib-sms-input" data-placeholder="WhatsApp" data-required="true" data-country-code="CL" data-value="" data-attributename="SMS">
                    <div class="entry__field"><select class="input" name="SMS__COUNTRY_CODE" data-required="true">${COUNTRY_OPTIONS}</select></div>
                    <div class="entry__field" style="width: 100%"><input type="tel" class="input" id="SMS" name="SMS" autocomplete="off" placeholder="WhatsApp" data-required="true" required /></div>
                  </div>
                  <div class="sib-sms-tooltip"><div class="sib-sms-tooltip__box">El campo SMS debe contener entre 6 y 19 cifras e incluir el prefijo del país sin «+» ni «0» delante (ej.: 34xxxxxxxxxxx para España)</div><span class="sib-sms-tooltip__icon">?</span></div>
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__error entry__error--secondary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row  form__label-row--horizontal "><div class="entry__field"><textarea rows="2" class="input " maxlength="500" id="APELLIDOS" name="APELLIDOS" autocomplete="off" placeholder="Mensaje" data-required="true" required></textarea></div></div><label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label><label class="entry__specification" style="font-family:Helvetica, sans-serif; font-size:12px; text-align:left; color:#8390A4;">Cuéntanos con tus palabras cual es el servicio que requieres</label></div></div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align: left">
            <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-family:Futura, sans-serif; font-size:18px; text-align:left; color:#FFFFFF; background-color:#b00ee2; border-width:0px; border-radius:19px;" form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512"><path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" /></svg>
              COTIZA AQUÍ
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

export default function BrevoContact() {
  return (
    <BrevoForm
      html={CONTACT_HTML}
      title="Formulario de contacto Prisma Digital"
      initialHeight={560}
    />
  );
}
