/* Conexión a Firebase/Firestore para guardar los assessments de diagnóstico.
   - Config PÚBLICA vía import.meta.env.VITE_* (las claves web de Firebase no son
     secretos: la seguridad real vive en las reglas de Firestore — ver FIREBASE_SETUP.md).
   - Init perezoso con import dinámico: el SDK solo se descarga al guardar,
     y nunca se ejecuta en SSR. */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

/** true cuando las variables de entorno mínimas están presentes. */
export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

/** Guarda un assessment en la colección `assessments`. Devuelve el id del documento. */
export async function saveAssessment(payload: Record<string, unknown>): Promise<string> {
  if (!firebaseReady) {
    throw new Error(
      "Firebase no está configurado: faltan las variables VITE_FIREBASE_* (ver FIREBASE_SETUP.md).",
    );
  }
  const { initializeApp, getApps, getApp } = await import("firebase/app");
  const { getFirestore, collection, addDoc, serverTimestamp } = await import(
    "firebase/firestore"
  );
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const ref = await addDoc(collection(db, "assessments"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
