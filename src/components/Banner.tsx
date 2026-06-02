/* CREDIBILITY BANNER */
export default function Banner() {
  return (
    <section
      id="nosotros"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.58 0.27 350) 0%, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.45 0.22 305) 0%, transparent 40%)",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight uppercase">
          No trabajamos en proyectos aislados.{" "}
          <span className="text-secondary">
            Trabajamos en el antes, el durante y el después
          </span>{" "}
          de cada empresa que nos contrata.
        </h2>
        <p className="mt-8 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Porque un cliente que crece, no se va.
          <br />
          Y eso es lo único que nos importa medir.
        </p>
      </div>
    </section>
  );
}
