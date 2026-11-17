import type { CenterId } from "./bands";

/**
 * Geometría de cada luz: avanza matemáticamente del círculo a la esfera, pasando por los 5 sólidos platónicos
 * (tetraedro = fuego, cubo = tierra, octaedro = aire, dodecaedro = éter, icosaedro = agua) y las geodas.
 * (Portado del proyecto Prismate de Ave Proyectos — contactoaveproyectos-cmd/prisma.)
 */
export type SolidKind = "circulo" | "tetraedro" | "cubo" | "octaedro" | "dodecaedro" | "icosaedro" | "geoda80" | "geoda320" | "esfera";

export const GEOMETRY: Record<CenterId, { kind: SolidKind; name: string; detail: string }> = {
  rosa: { kind: "circulo", name: "Círculo", detail: "el origen" },
  rojo: { kind: "tetraedro", name: "Tetraedro", detail: "4 caras · fuego" },
  naranjo: { kind: "cubo", name: "Cubo", detail: "6 caras · tierra" },
  amarillo: { kind: "octaedro", name: "Octaedro", detail: "8 caras · aire" },
  verde: { kind: "dodecaedro", name: "Dodecaedro", detail: "12 caras · éter" },
  celeste: { kind: "icosaedro", name: "Icosaedro", detail: "20 caras · agua" },
  azul: { kind: "geoda80", name: "Geoda", detail: "80 caras" },
  indigo: { kind: "geoda320", name: "Geoda", detail: "320 caras" },
  violeta: { kind: "esfera", name: "Esfera", detail: "el todo" },
};
