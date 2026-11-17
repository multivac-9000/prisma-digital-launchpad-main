import { Edges, Line, OrbitControls, QuadraticBezierLine, Stars } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CENTERS, type CenterId } from "@/lib/prism/bands";
import { GEOMETRY, type SolidKind } from "@/lib/prism/geometry";

/**
 * Universo de Prismate: una pirámide de cristal en la base. Desde su centro se irradia la luz en 9 colores: 9 esferas en órbita, cada una con su geometría
 * (del círculo a la esfera, pasando por los sólidos platónicos). Al fondo, estrellas quietas.
 */

export type UniverseProps = {
  intensities: Record<CenterId, number>;
  ranking: CenterId[];
  selected: CenterId | null;
  onSelect: (id: CenterId | null) => void;
  reduced: boolean;
  compact: boolean;
  /** Entrada desde la portada: la cámara parte dentro del prisma y sale con un gran zoom out */
  intro?: boolean;
  /** Elegiste un centro: la cámara vuela hacia adentro de ese color */
  dive?: CenterId | null;
  /** Se llama cuando el 3D ya está listo para dibujar */
  onReady?: () => void;
};

const PYR_H = 2.3;
const CORE = new THREE.Vector3(0, PYR_H * 0.36, 0);
const ORBIT_Y = 2.6;
const ORBIT_R0 = 2.7;
const ORBIT_GAP = 1.35;
const LOOK = new THREE.Vector3(0, 1.8, 0);
const INTRO_S = 3.6; // duración del zoom out de entrada

/** Reloj de la entrada: t0 es el segundo en que empezó (null = todavía no). */
type IntroClock = { on: boolean; t0: number | null };
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOutBack = (x: number) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
/** Segundos desde que empezó la entrada (Infinity si no hay entrada). */
function introSince(ic: IntroClock, now: number) {
  if (!ic.on) return Infinity;
  return ic.t0 === null ? 0 : now - ic.t0;
}

/** La cámara parte dentro de la luz del prisma y sale girando hasta ver todo el universo. */
function IntroCamera({ intro, onDone, onStart }: { intro: React.RefObject<IntroClock>; onDone: () => void; onStart?: () => void }) {
  const frames = useRef(0);
  const fin = useRef<THREE.Vector3 | null>(null);
  const start = useMemo(() => CORE.clone().add(new THREE.Vector3(0, 0.05, 0.55)), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const done = useRef(false);
  useFrame(({ camera, clock }) => {
    const ic = intro.current;
    if (!ic.on || done.current) return;
    const now = clock.getElapsedTime();
    if (!fin.current) fin.current = camera.position.clone();
    if (ic.t0 === null) {
      // Parte recién cuando el 3D ya dibuja fluido (los primeros cuadros cargan sombreadores)
      camera.position.copy(start);
      camera.lookAt(CORE);
      if (++frames.current < 4) return;
      ic.t0 = now;
      onStart?.();
    }
    const p = clamp01((now - ic.t0) / INTRO_S);
    const e = 1 - Math.pow(1 - p, 4); // ¡buam!: sale rápido y se asienta suave
    camera.position.lerpVectors(start, fin.current!, e);
    camera.position.applyAxisAngle(THREE.Object3D.DEFAULT_UP, (1 - e) * Math.PI * 1.4);
    look.copy(CORE).lerp(LOOK, clamp01(e * 1.3));
    camera.lookAt(look);
    if (p >= 1) {
      done.current = true;
      onDone();
    }
  });
  return null;
}

/** Vuelo hacia adentro del centro elegido, siguiéndolo en su órbita. */
function DiveCamera({ orb }: { orb: Orb }) {
  const t0 = useRef<number | null>(null);
  const from = useRef<THREE.Vector3 | null>(null);
  const fov = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, clock }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const now = clock.getElapsedTime();
    if (t0.current === null) {
      t0.current = now;
      from.current = cam.position.clone();
      fov.current = cam.fov;
    }
    const a = orb.phase + now * orb.speed;
    pos.set(Math.cos(a) * orb.radius, ORBIT_Y + orb.lift + Math.sin(a) * orb.tilt, Math.sin(a) * orb.radius);
    const p = clamp01((now - t0.current) / 1.25);
    const e = p * p * p * (p * (6 * p - 15) + 10);
    cam.position.lerpVectors(from.current!, pos, e);
    look.copy(LOOK).lerp(pos, clamp01(p * 3.2));
    cam.lookAt(look);
    cam.fov = fov.current + 44 * e;
    cam.updateProjectionMatrix();
  });
  return null;
}

/** Textura de brillo (degradado radial), una sola para todo. */
let glowTexture: THREE.Texture | null = null;
export function getGlow() {
  if (glowTexture) return glowTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.5)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  glowTexture = new THREE.CanvasTexture(c);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

/** Nombre de cada esfera como textura de texto. */
function useLabel(text: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    const g = c.getContext("2d")!;
    const font = "500 44px Inter, system-ui, sans-serif";
    g.font = font;
    const w = Math.ceil(g.measureText(text).width) + 40;
    c.width = w;
    c.height = 72;
    g.font = font;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = "rgba(0,0,0,0.9)";
    g.shadowBlur = 12;
    g.fillStyle = "#ffffff";
    g.fillText(text, w / 2, 36);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return { map: t, aspect: w / 72 };
  }, [text]);
}

/** Geometría de cada sólido (escala 1). */
export function solidGeometry(kind: SolidKind): THREE.BufferGeometry {
  switch (kind) {
    case "circulo":
      return new THREE.TorusGeometry(0.75, 0.03, 8, 64);
    case "tetraedro":
      return new THREE.TetrahedronGeometry(0.85);
    case "cubo":
      return new THREE.BoxGeometry(1, 1, 1);
    case "octaedro":
      return new THREE.OctahedronGeometry(0.85);
    case "dodecaedro":
      return new THREE.DodecahedronGeometry(0.8);
    case "icosaedro":
      return new THREE.IcosahedronGeometry(0.8, 0);
    case "geoda80":
      return new THREE.IcosahedronGeometry(0.8, 1);
    case "geoda320":
      return new THREE.IcosahedronGeometry(0.8, 2);
    case "esfera":
      return new THREE.SphereGeometry(0.78, 24, 16);
  }
}

/** La pirámide de cristal en la base; la luz nace en su centro. */
function Pyramid({ reduced, intro }: { reduced: boolean; intro: React.RefObject<IntroClock> }) {
  const ref = useRef<THREE.Group>(null);
  const core = useRef<THREE.Sprite>(null);
  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    if (ref.current && !reduced) ref.current.rotation.y = now * 0.12;
    // En la entrada, la luz del centro parte llenándolo todo y se recoge dentro de la pirámide
    const k = 1 - Math.pow(clamp01(introSince(intro.current, now) / 1.8), 0.6);
    if (core.current) {
      core.current.scale.setScalar(1.8 + k * 30);
      (core.current.material as THREE.SpriteMaterial).opacity = 0.65 + 0.35 * k;
    }
  });
  const glow = getGlow();
  return (
    <group>
      {/* La pirámide */}
      <group ref={ref}>
        <mesh position={[0, PYR_H / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.6, PYR_H, 4, 1]} />
          <meshPhysicalMaterial
            color="#dfe9ff"
            roughness={0.05}
            iridescence={1}
            iridescenceIOR={1.4}
            clearcoat={1}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
          <Edges color="#ffffff" threshold={10} />
        </mesh>
      </group>
      {/* Brillo en el centro de la pirámide, donde nacen los colores */}
      <sprite ref={core} position={CORE} scale={[1.8, 1.8, 1]}>
        <spriteMaterial map={glow} color="#ffffff" transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
    </group>
  );
}

/** ¡Bum!: 9 ondas de color salen del corazón del prisma al abrirse el universo. */
function Shockwave({ intro }: { intro: React.RefObject<IntroClock> }) {
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const since = introSince(intro.current, clock.getElapsedTime());
    rings.current.forEach((m, i) => {
      if (!m) return;
      const p = since === Infinity ? 1 : clamp01((since - 0.25 - i * 0.07) / 1.5);
      m.visible = p > 0 && p < 1;
      m.scale.setScalar(0.1 + (1 - Math.pow(1 - p, 3)) * (ORBIT_R0 + ORBIT_GAP * 11));
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - p) * (1 - p) * 0.9;
    });
  });
  return (
    <group position={[CORE.x, ORBIT_Y, CORE.z]} rotation={[-Math.PI / 2, 0, 0]}>
      {CENTERS.map((c, i) => (
        <mesh
          key={c.id}
          visible={false}
          ref={(el) => {
            rings.current[i] = el;
          }}
        >
          <ringGeometry args={[0.965, 1, 128]} />
          <meshBasicMaterial color={c.hex} transparent opacity={0} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Anillos de luz alrededor de la base. */
function Rings({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.z += dt * 0.05;
  });
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      {[1.9, 2.4, 3.0, 3.7].map((r, i) => (
        <mesh key={r}>
          <ringGeometry args={[r, r + 0.03 - i * 0.004, 128]} />
          <meshBasicMaterial color={i % 2 ? "#FFD23F" : "#ffffff"} transparent opacity={0.5 - i * 0.09} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

type Orb = { index: number; id: CenterId; hex: string; name: string; kind: SolidKind; radius: number; size: number; speed: number; phase: number; tilt: number; lift: number };

/** Una esfera de cristal con su geometría de luz adentro. */
function Sphere({
  orb,
  selected,
  dimmed,
  onSelect,
  reduced,
  compact,
  intro,
}: {
  orb: Orb;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
  reduced: boolean;
  compact: boolean;
  intro: React.RefObject<IntroClock>;
}) {
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Group>(null);
  const ray = useRef<{ setPoints: (a: THREE.Vector3, b: THREE.Vector3, m: THREE.Vector3) => void } | null>(null);
  const [hover, setHover] = useState(false);
  const label = useLabel(orb.name);
  const glow = getGlow();
  const geo = useMemo(() => solidGeometry(orb.kind), [orb.kind]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 1), [geo]);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const end = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, dt) => {
    const t = reduced ? 0 : clock.getElapsedTime();
    const since = introSince(intro.current, clock.getElapsedTime());
    // Entrada: los centros llegan girando a toda velocidad y calzan en su espiral, cada uno en su órbita
    const swirl = since === Infinity ? 0 : Math.pow(1 - clamp01(since / INTRO_S), 3) * Math.PI * (3.2 + orb.index * 0.75);
    const a = orb.phase + t * orb.speed + swirl;
    pos.set(Math.cos(a) * orb.radius, ORBIT_Y + orb.lift + Math.sin(a) * orb.tilt, Math.sin(a) * orb.radius);
    // Entrada: cada centro se enciende en su turno (rosado primero, violeta al final)
    const ap = since === Infinity ? 1 : easeOutBack(clamp01((since - 0.7 - orb.index * 0.16) / 0.75));
    if (group.current) {
      group.current.position.copy(pos);
      const k = (hover || selected ? 1.15 : 1) * (dimmed ? 0.85 : 1);
      if (ap < 1 || since < 4) group.current.scale.setScalar(Math.max(ap, 0.0001) * k);
      else group.current.scale.lerp(target.set(k, k, k), 0.12);
    }
    if (solid.current && !reduced) {
      solid.current.rotation.x += dt * 0.3;
      solid.current.rotation.y += dt * 0.45;
    }
    const reach = clamp01(ap);
    end.copy(CORE).lerp(pos, reach);
    mid.set(end.x * 0.5, Math.max(CORE.y, end.y) + 0.9 * reach, end.z * 0.5);
    ray.current?.setPoints(CORE, end, mid);
  });

  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <>
      <QuadraticBezierLine
        ref={ray as never}
        start={CORE}
        end={[orb.radius, ORBIT_Y + orb.lift, 0]}
        color={orb.hex}
        lineWidth={selected ? 2.2 : 1.1}
        transparent
        opacity={dimmed ? 0.1 : selected ? 0.95 : 0.4}
      />
      <group ref={group}>
        <sprite scale={[orb.size * 2.4, orb.size * 2.4, 1]}>
          <spriteMaterial map={glow} color={orb.hex} transparent opacity={dimmed ? 0.12 : 0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
        {/* geometría de luz */}
        <group ref={solid} scale={orb.size * 0.62}>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color={orb.hex} transparent opacity={dimmed ? 0.35 : 1} />
          </lineSegments>
          <mesh geometry={geo}>
            <meshBasicMaterial color={orb.hex} transparent opacity={dimmed ? 0.05 : 0.16} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* cristal */}
        <mesh
          onClick={click}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = "";
          }}
        >
          <sphereGeometry args={[orb.size, 40, 40]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.03} clearcoat={1} clearcoatRoughness={0.05} transparent opacity={0.12} depthWrite={false} />
        </mesh>
        <mesh scale={1.03}>
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshBasicMaterial color={orb.hex} transparent opacity={dimmed ? 0.04 : 0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {selected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orb.size * 1.25, orb.size * 1.31, 64]} />
            <meshBasicMaterial color={orb.hex} transparent opacity={0.9} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
        )}
        {(!compact || selected) && (
          <sprite position={[0, -orb.size - 0.36, 0]} scale={[0.32 * label.aspect, 0.32, 1]}>
            <spriteMaterial map={label.map} transparent opacity={selected ? 1 : dimmed ? 0.35 : 0.8} depthWrite={false} />
          </sprite>
        )}
      </group>
    </>
  );
}

/** Órbitas tenues. */
function OrbitPath({ orb }: { orb: Orb }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push([Math.cos(a) * orb.radius, ORBIT_Y + orb.lift + Math.sin(a) * orb.tilt, Math.sin(a) * orb.radius]);
    }
    return pts;
  }, [orb]);
  return <Line points={points} color={orb.hex} lineWidth={0.7} transparent opacity={0.16} />;
}

function Scene({ intensities, ranking, selected, onSelect, reduced, compact, intro: introOn = false, onReady, dive = null }: UniverseProps) {
  const intro = useRef<IntroClock>({ on: introOn && !reduced, t0: null });
  const [introDone, setIntroDone] = useState(!intro.current.on);
  const orbs: Orb[] = useMemo(
    () =>
      ranking.map((id) => {
        const c = CENTERS.find((x) => x.id === id)!;
        const v = intensities[id];
        return {
          index: c.index,
          id,
          hex: c.hex,
          name: c.name,
          kind: GEOMETRY[id].kind,
          // Como planetas alrededor del Sol: cada luz en su propia órbita, del rosado (la más cercana)
          // al violeta (la más lejana). Las órbitas están separadas más que el tamaño de dos esferas.
          radius: ORBIT_R0 + c.index * ORBIT_GAP,
          size: 0.4 + (v / 100) * 0.3,
          // Todas giran juntas, alineadas en un brazo en espiral: el orden rosa → violeta siempre se lee.
          speed: reduced ? 0 : 0.1,
          phase: -c.index * 0.32,
          tilt: 0.12 + c.index * 0.03,
          lift: 0,
        };
      }),
    [intensities, ranking, reduced],
  );

  const diveOrb = dive ? (orbs.find((o) => o.id === dive) ?? null) : null;

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 22, 60]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 10, 6]} intensity={1.1} />
      {/* Estrellas quietas: la luz no parpadea */}
      <Stars radius={80} depth={50} count={compact ? 900 : 1800} factor={3} saturation={0.3} fade speed={0} />

      {diveOrb && <DiveCamera orb={diveOrb} />}
      {intro.current.on && !dive && <IntroCamera intro={intro} onDone={() => setIntroDone(true)} onStart={onReady} />}
      <Pyramid reduced={reduced} intro={intro} />
      <Rings reduced={reduced} />
      {intro.current.on && <Shockwave intro={intro} />}
      {orbs.map((o) => (
        <OrbitPath key={`p-${o.id}`} orb={o} />
      ))}
      {orbs.map((o) => (
        <Sphere
          key={o.id}
          orb={o}
          selected={selected === o.id}
          dimmed={selected !== null && selected !== o.id}
          onSelect={() => onSelect(selected === o.id ? null : o.id)}
          reduced={reduced}
          compact={compact}
          intro={intro}
        />
      ))}

      <OrbitControls
        enabled={introDone && !dive}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={compact ? 46 : 34}
        maxPolarAngle={Math.PI * 0.62}
        minPolarAngle={Math.PI * 0.15}
        target={[0, 1.8, 0]}
        autoRotate={introDone && !reduced && selected === null}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function LightUniverse(props: UniverseProps) {
  // Si la pestaña no se ve, el 3D se detiene (ahorra batería y no calienta el teléfono)
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, props.compact ? 1.5 : 1.5]}
      camera={props.compact ? { position: [0, 14, 29], fov: 54 } : { position: [0, 8, 17.5], fov: 46 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={() => props.onSelect(null)}
      onCreated={() => {
        if (!props.intro || props.reduced) props.onReady?.();
      }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
