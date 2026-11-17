import type { CenterId, Mode } from "./bands";

/**
 * 9 preguntas por camino. Cada pregunta pertenece a un centro (su color) y se responde
 * eligiendo una de 9 luces: la respuesta n° i corresponde al centro n° i
 * (rosa, rojo, naranjo, amarillo, verde, celeste, azul, azul oscuro, violeta).
 */
export interface Question {
  center: CenterId;
  prompt: string;
  options: [string, string, string, string, string, string, string, string, string];
}

const JOVEN: Question[] = [
  {
    center: "rosa",
    prompt: "¿Qué te atrae con más fuerza?",
    options: ["La belleza y el estilo", "Sentirme lleno de energía", "Ganar un desafío", "Una buena comida", "Estar con quienes quiero", "La música", "Una buena idea", "Entender cómo funciona algo", "Una buena causa"],
  },
  {
    center: "rojo",
    prompt: "¿Dónde sientes más vida?",
    options: ["Arreglándome y luciendo bien", "Bailando o moviéndome", "Entrenando", "Cocinando", "En la naturaleza", "Cantando", "Aprendiendo algo nuevo", "Resolviendo algo difícil", "Ayudando en una causa"],
  },
  {
    center: "naranjo",
    prompt: "¿Para qué tienes más disciplina?",
    options: ["Mi imagen y mi estilo", "Cuidar mi cuerpo", "Mi entrenamiento", "Comer bien", "Estar para los demás", "Practicar voz o instrumento", "Estudiar", "Lógica o programación", "Mis causas"],
  },
  {
    center: "amarillo",
    prompt: "¿Qué te gustaría cuidar o hacer crecer?",
    options: ["La autoestima de la gente", "La salud del cuerpo", "El rendimiento", "Lo que comemos", "Las relaciones y la tierra", "La música y la cultura", "El conocimiento", "La tecnología", "El impacto social"],
  },
  {
    center: "verde",
    prompt: "¿A quién te gustaría ayudar?",
    options: ["A quien quiere verse bien", "A quien quiere sanar su cuerpo", "A quien quiere superarse", "A quien quiere comer mejor", "A quien necesita compañía", "A quien quiere ser escuchado", "A quien quiere aprender", "A quien necesita soluciones exactas", "A quien busca sentido"],
  },
  {
    center: "celeste",
    prompt: "¿Cómo te expresas mejor?",
    options: ["Con mi estilo", "Con el cuerpo", "Con acción", "Cocinando para otros", "Con presencia y abrazos", "Con la voz", "Escribiendo", "Con datos y fórmulas", "Con mis acciones"],
  },
  {
    center: "azul",
    prompt: "¿De qué podrías hablar por horas?",
    options: ["Moda y belleza", "Cuerpo y salud", "Deporte", "Comida", "Personas y naturaleza", "Música y artistas", "Ideas y tendencias", "Ciencia y tecnología", "Causas y bienestar"],
  },
  {
    center: "indigo",
    prompt: "Frente a un problema, ¿qué haces?",
    options: ["Lo miro desde la estética", "Me muevo para despejarme", "Lo enfrento de frente", "Busco lo práctico", "Pregunto a gente de confianza", "Lo converso en voz alta", "Lo escribo y lo ordeno", "Lo analizo con lógica", "Escucho mi intuición"],
  },
  {
    center: "violeta",
    prompt: "Si en 10 años lo lograste, ¿qué dirían de ti?",
    options: ["Que hizo brillar a otros", "Que llenó de vida", "Que nunca se rindió", "Que nutrió a muchos", "Que unió personas", "Que su voz llegó lejos", "Que enseñó a pensar", "Que descubrió algo nuevo", "Que mejoró el mundo"],
  },
];

const EMPRESA: Question[] = [
  {
    center: "rosa",
    prompt: "¿Qué hace deseable a tu marca?",
    options: ["Su estética", "La energía que transmite", "Su exigencia", "Su sabor o calidad", "Su calidez", "Su voz y su música", "Sus ideas", "Su precisión", "Su propósito"],
  },
  {
    center: "rojo",
    prompt: "¿Qué le da vida a tu negocio hoy?",
    options: ["La imagen y la moda", "Experiencias en el cuerpo", "Retos y resultados", "Productos que se consumen", "La comunidad", "Contenido y eventos", "Formación", "Tecnología", "Una causa"],
  },
  {
    center: "naranjo",
    prompt: "¿En qué es más disciplinado tu equipo?",
    options: ["En cuidar la imagen", "En el trato presencial", "En cumplir metas", "En la calidad del producto", "En atender bien", "En comunicar", "En planificar", "En medirlo todo", "En sus valores"],
  },
  {
    center: "amarillo",
    prompt: "¿Qué necesidad cubres?",
    options: ["Sentirse atractivo", "Sentirse bien en el cuerpo", "Rendir más", "Comer y estar sano", "Sentirse acompañado", "Inspirarse y entretenerse", "Aprender", "Resolver algo técnico", "Encontrar sentido"],
  },
  {
    center: "verde",
    prompt: "¿Quién es tu cliente ideal?",
    options: ["Quien cuida su imagen", "Quien quiere sentirse vivo", "Quien quiere superarse", "Familias que comen mejor", "Comunidades", "Quien sigue artistas", "Estudiantes y equipos", "Empresas técnicas", "Consumidores conscientes"],
  },
  {
    center: "celeste",
    prompt: "¿Dónde habla mejor tu marca?",
    options: ["En fotos e Instagram", "En experiencias en vivo", "En retos y competencias", "En degustaciones", "En el boca a boca", "En video y podcast", "En newsletters y cursos", "En demos y datos", "En proyectos con causa"],
  },
  {
    center: "azul",
    prompt: "¿Qué sabe tu marca que otros no?",
    options: ["Qué está de moda", "Cómo hacer sentir bien", "Cómo lograr resultados", "Qué es sano y rico", "Qué necesita la gente", "Qué emociona", "Cómo enseñar", "Cómo optimizar", "Por qué existe"],
  },
  {
    center: "indigo",
    prompt: "¿Cómo toman las decisiones?",
    options: ["Por intuición estética", "Probando en terreno", "Por metas", "Por lo práctico", "Escuchando a clientes", "Conversando en equipo", "Con estrategia", "Con datos", "Con valores"],
  },
  {
    center: "violeta",
    prompt: "En 10 años, ¿qué dirán de tu marca?",
    options: ["Que hizo brillar a la gente", "Que dio energía", "Que formó campeones", "Que alimentó bien", "Que unió comunidades", "Que fue la voz de su generación", "Que educó", "Que innovó", "Que generó impacto"],
  },
];

export const QUESTIONS: Record<Mode, Question[]> = { joven: JOVEN, empresa: EMPRESA };
export const QUESTION_COUNT = 9;
