const pillars = [
  {
    number: "01",
    rune: "ᚨ",
    title: "Visión afilada",
    text: "Convertimos complejidad en una dirección clara, relevante y difícil de ignorar.",
  },
  {
    number: "02",
    rune: "ᛏ",
    title: "Diseño con alma",
    text: "Creamos sistemas visuales sobrios y memorables que elevan cada interacción.",
  },
  {
    number: "03",
    rune: "ᛟ",
    title: "Ingeniería sólida",
    text: "Construimos productos rápidos, accesibles y preparados para crecer sin fricción.",
  },
];

export function Pillars() {
  return (
    <section className="section pillars" id="vision">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow"><span /> Nuestro credo</p>
          <h2>La fuerza nace de<br /><em>un propósito claro.</em></h2>
          <p>No seguimos tendencias. Diseñamos experiencias que resisten el paso del tiempo.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              <div className="card-top"><span>{pillar.number}</span><i>{pillar.rune}</i></div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <span className="card-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
