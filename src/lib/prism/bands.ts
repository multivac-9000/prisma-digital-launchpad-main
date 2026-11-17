/**
 * Los 9 centros de luz del Método Prismate, de abajo (rosa / rojo) hacia arriba (violeta).
 * Cada color agrupa un mercado y ejemplos de nicho; la vibración (nm / THz) es la física real de ese color.
 * Edita aquí nombres, áreas y textos sin tocar componentes.
 */
export type CenterId = "rosa" | "rojo" | "naranjo" | "amarillo" | "verde" | "celeste" | "azul" | "indigo" | "violeta";
export type BandId = CenterId;
export type Mode = "joven" | "empresa";

export interface Center {
  id: CenterId;
  index: number;
  color: string;
  hex: string;
  /** Nombre del centro */
  name: string;
  /** Parte del cuerpo / organismo */
  organ: string;
  /** Una línea directa sobre qué mueve a quien tiene este centro fuerte */
  description: string;
  /** Mercado que agrupa, en pocas palabras */
  areas: string;
  /** Vibración de ese color de luz: longitud de onda (nm) y frecuencia (THz). Rosa es mezcla de rojo y violeta. */
  nm: string;
  thz: string;
  /** Ejemplos concretos de nicho */
  examples: [string, string];

  // Persona
  careers: string[];
  field: string;
  focus: string;
  firstStep: string;

  // Empresa
  market: string;
  audience: string;
  attack: string;
  channels: string;
  brandDescription: string;
}

export const CENTERS: Center[] = [
  {
    id: "rosa",
    index: 0,
    color: "Rosa",
    hex: "#FF5FA2",
    name: "Atracción",
    organ: "Sexo",
    areas: "Moda, belleza e imagen",
    nm: "rojo + violeta",
    thz: "mezcla",
    examples: ["Marca de cosmética natural", "Asesoría de imagen personal"],
    description: "Te mueve la atracción, la estética y el cuerpo como expresión.",
    careers: ["Moda y estilismo", "Belleza y cosmética", "Fotografía de moda", "Educación sexual y de pareja"],
    field: "Moda, belleza y sensualidad",
    focus: "la imagen y la atracción",
    firstStep: "Arma un portafolio de 9 fotos o looks que muestren tu estilo.",
    market: "Moda y belleza",
    audience: "personas que cuidan su imagen",
    attack: "Muestra transformaciones reales, antes y después, en video corto.",
    channels: "Instagram y TikTok, con contenido muy visual.",
    brandDescription: "Tu marca vende deseo: estética, imagen y atracción.",
  },
  {
    id: "rojo",
    index: 1,
    color: "Rojo",
    hex: "#FF3B4E",
    name: "Energía",
    organ: "Sangre",
    areas: "Cuerpo y movimiento",
    nm: "700 nm",
    thz: "430 THz",
    examples: ["Estudio de danza", "Masaje deportivo a domicilio"],
    description: "Tu fuerza está en el cuerpo: la energía, el movimiento y la vitalidad.",
    careers: ["Danza", "Masaje y terapias corporales", "Kinesiología", "Imagen y presencia personal"],
    field: "Cuerpo y energía vital",
    focus: "el cuerpo y la energía",
    firstStep: "Toma esta semana una clase de danza, masaje o terapia corporal y anota cómo te sentiste.",
    market: "Bienestar corporal",
    audience: "personas que quieren sentirse vivas",
    attack: "Ofrece una primera sesión de prueba que se sienta en el cuerpo.",
    channels: "Talleres presenciales y reels de movimiento.",
    brandDescription: "Tu marca da energía: se vive en el cuerpo.",
  },
  {
    id: "naranjo",
    index: 2,
    color: "Naranjo",
    hex: "#FF8A3D",
    name: "Rendimiento",
    organ: "Músculo",
    areas: "Deporte y disciplina",
    nm: "610 nm",
    thz: "490 THz",
    examples: ["Entrenador de running", "Box para principiantes"],
    description: "Te mueve la disciplina: entrenar, competir y no rendirte.",
    careers: ["Entrenamiento deportivo", "Preparación física", "Artes marciales", "Coaching de disciplina"],
    field: "Deporte y disciplina",
    focus: "la disciplina",
    firstStep: "Define una rutina de 30 días y regístrala cada día.",
    market: "Deporte y entrenamiento",
    audience: "personas que quieren superarse",
    attack: "Lanza un reto de 21 días con seguimiento y resultados medibles.",
    channels: "Comunidades deportivas, apps de entrenamiento e Instagram.",
    brandDescription: "Tu marca exige y logra: disciplina y resultados.",
  },
  {
    id: "amarillo",
    index: 3,
    color: "Amarillo",
    hex: "#FFD23F",
    name: "Nutrición",
    organ: "Vientre",
    areas: "Alimentos y salud",
    nm: "580 nm",
    thz: "520 THz",
    examples: ["Comida saludable a domicilio", "Nutrición deportiva"],
    description: "Te importa nutrir y cuidar: la comida, la salud y lo que sostiene la vida.",
    careers: ["Cocina profesional (chef)", "Nutrición", "Agricultura y huertos", "Salud preventiva"],
    field: "Alimentación y salud",
    focus: "la alimentación sana",
    firstStep: "Cocina o investiga una receta saludable por semana y compártela.",
    market: "Alimentos y salud",
    audience: "familias que quieren comer mejor",
    attack: "Da a probar: degustaciones, recetas gratis y muestras.",
    channels: "Ferias, delivery y recetas en video.",
    brandDescription: "Tu marca nutre: alimento, salud y cuidado diario.",
  },
  {
    id: "verde",
    index: 4,
    color: "Verde",
    hex: "#3DDC84",
    name: "Cuidado",
    organ: "Corazón",
    areas: "Personas y naturaleza",
    nm: "530 nm",
    thz: "565 THz",
    examples: ["Turismo aventura", "Psicología infantil"],
    description: "Lo tuyo son las personas y la tierra: acompañar, cuidar, explorar.",
    careers: ["Psicología", "Trabajo social y comunidad", "Paisajismo", "Turismo aventura"],
    field: "Personas y naturaleza",
    focus: "las relaciones humanas",
    firstStep: "Súmate como voluntario a algo que ayude a personas o a la naturaleza.",
    market: "Cuidado, comunidad y naturaleza",
    audience: "comunidades y familias",
    attack: "Crea comunidad: encuentros, salidas y seguimiento cercano.",
    channels: "Eventos, grupos de WhatsApp y boca a boca.",
    brandDescription: "Tu marca acompaña: la eligen porque se sienten cuidados.",
  },
  {
    id: "celeste",
    index: 5,
    color: "Celeste",
    hex: "#5FD7FF",
    name: "Comunicación",
    organ: "Garganta",
    areas: "Medios, música y eventos",
    nm: "490 nm",
    thz: "610 THz",
    examples: ["Podcast de emprendimiento", "Clases de canto online"],
    description: "Naciste para expresarte: hablar, cantar, comunicar.",
    careers: ["Canto y música", "Locución y podcast", "Actuación", "Comunicación y vocería"],
    field: "Voz, música y comunicación",
    focus: "la expresión",
    firstStep: "Graba un video de un minuto hablando o cantando sobre lo que te apasiona.",
    market: "Medios, música y eventos",
    audience: "audiencias que quieren inspirarse",
    attack: "Pon una cara y una voz: un video o podcast cada semana.",
    channels: "YouTube, podcast y escenarios en vivo.",
    brandDescription: "Tu marca tiene voz: se hace escuchar y emociona.",
  },
  {
    id: "azul",
    index: 6,
    color: "Azul",
    hex: "#3D8BFF",
    name: "Educación",
    organ: "Ojos",
    areas: "Contenido, cursos y estrategia",
    nm: "465 nm",
    thz: "645 THz",
    examples: ["Cursos online", "Agencia de marketing"],
    description: "Piensas y explicas con claridad: analizas, ordenas y haces entender.",
    careers: ["Escritura y periodismo", "Educación", "Marketing y estrategia", "Diseño de experiencias"],
    field: "Ideas, educación y estrategia",
    focus: "el aprendizaje",
    firstStep: "Escribe un texto corto que explique algo que entiendes muy bien.",
    market: "Educación y estrategia",
    audience: "personas y equipos que quieren aprender",
    attack: "Enseña gratis lo esencial y cobra por la profundidad.",
    channels: "Newsletter, LinkedIn y cursos online.",
    brandDescription: "Tu marca enseña: ordena lo complejo y lo vuelve claro.",
  },
  {
    id: "indigo",
    index: 7,
    color: "Azul oscuro",
    hex: "#6366FF",
    name: "Tecnología",
    organ: "Mente",
    areas: "Datos, software e ingeniería",
    nm: "435 nm",
    thz: "690 THz",
    examples: ["Desarrollo de apps", "Análisis de datos para pymes"],
    description: "Te mueve entender cómo funcionan las cosas y construir soluciones con datos.",
    careers: ["Programación", "Ciencia de datos", "Ingeniería", "Diseño de producto digital"],
    field: "Ciencia, datos y tecnología",
    focus: "los datos y la precisión",
    firstStep: "Resuelve un problema real con números o código y documenta cómo lo hiciste.",
    market: "Tecnología e ingeniería",
    audience: "empresas que necesitan precisión",
    attack: "Demuestra con datos: casos medibles y pruebas gratuitas.",
    channels: "LinkedIn, demos y comunidades técnicas.",
    brandDescription: "Tu marca es precisa: datos, ciencia y tecnología.",
  },
  {
    id: "violeta",
    index: 8,
    color: "Violeta",
    hex: "#B57BFF",
    name: "Propósito",
    organ: "Alma",
    areas: "Impacto y bienestar",
    nm: "405 nm",
    thz: "740 THz",
    examples: ["Retiros de bienestar", "Empresa de impacto social"],
    description: "Te mueve el impacto: que lo que haces mejore la vida de otros.",
    careers: ["Proyectos de impacto social", "Bienestar en empresas", "ONG y fundaciones", "Medicina"],
    field: "Impacto y bienestar",
    focus: "el impacto",
    firstStep: "Elige una causa que te importe y súmate una tarde como voluntario.",
    market: "Impacto y bienestar",
    audience: "personas que buscan propósito",
    attack: "Muestra el impacto real de cada compra, con números y historias.",
    channels: "Retiros, comunidades e Instagram.",
    brandDescription: "Tu marca tiene propósito: su impacto es su mejor venta.",
  },
];

export const BANDS = CENTERS;
export const CENTER_BY_ID = Object.fromEntries(CENTERS.map((c) => [c.id, c])) as Record<CenterId, Center>;
export const BAND_BY_ID = CENTER_BY_ID;
