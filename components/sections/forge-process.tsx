const phases = [
  { number: "I", title: "Descubrir", text: "Escuchamos, investigamos y encontramos la verdad que moverá el proyecto." },
  { number: "II", title: "Definir", text: "Trazamos una dirección precisa y un sistema capaz de convertirla en realidad." },
  { number: "III", title: "Forjar", text: "Diseñamos y construimos con rigor, detalle y una obsesión serena por la calidad." },
  { number: "IV", title: "Elevar", text: "Medimos, aprendemos y fortalecemos el producto para su siguiente conquista." },
];

export function ForgeProcess() {
  return (
    <section className="section process" id="metodo">
      <div className="shell process-grid">
        <div className="process-intro">
          <p className="eyebrow"><span /> El método</p>
          <h2>Del fuego<br />a la forma.</h2>
          <p>Cada gran obra comienza con una pregunta valiente y se construye con disciplina.</p>
        </div>
        <ol className="phase-list">
          {phases.map((phase) => (
            <li key={phase.number}>
              <span>{phase.number}</span>
              <div><h3>{phase.title}</h3><p>{phase.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
