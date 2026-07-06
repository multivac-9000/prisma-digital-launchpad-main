// Empuja eventos de CTA al dataLayer de GTM (el contenedor se carga en __root.tsx).
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackCta(name: string, location: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cta_click",
    cta_name: name,
    cta_location: location,
    page_variant: "nueva-landing",
  });
}
