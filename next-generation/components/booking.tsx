const steps = [
  {
    title: "Anfrage",
    text: "Sie schicken uns Veranstaltungsart, Datum und Ort, per Formular oder E-Mail.",
  },
  {
    title: "Angebot",
    text: "Innerhalb von 24 Stunden bekommen Sie ein unverbindliches Angebot.",
  },
  {
    title: "Programm",
    text: "Wir stimmen die Musik auf Ihre Wünsche und Ihr Publikum ab.",
  },
  {
    title: "Auftritt",
    text: "Wir spielen, Ihre Gäste tanzen.",
  },
];

const faqs = [
  {
    q: "Was kostet ein Auftritt?",
    a: "Das hängt vom Anlass, der Spieldauer und dem Ort ab. Schreiben Sie uns die Eckdaten, dann bekommen Sie ein unverbindliches Angebot.",
  },
  {
    q: "Welche Musik spielt ihr?",
    a: "Von AC/DC bis ZZ Top und aktuelle Nummern aus den Charts: Tanzmusik für alle Generationen, Classic und Cover Rock bis hin zu knalligem Partyrock.",
  },
  {
    q: "Können wir Musikwünsche äußern?",
    a: "Ja. Wir stellen das Programm passend zu Ihrem Fest zusammen, ob Bierzelt, Ball oder Geburtstag.",
  },
  {
    q: "Wo spielt ihr?",
    a: "Zuhause sind wir im Raum Eichstätt, gebucht werden wir in ganz Bayern.",
  },
  {
    q: "Was sollte in der Anfrage stehen?",
    a: "Veranstaltungsart, Wunschdatum und Ort. Hilfreich sind außerdem die ungefähre Gästezahl und wie lange wir spielen sollen.",
  },
];

export function BookingSection() {
  return (
    <section id="buchung" className="booking-section" aria-labelledby="booking-title">
      <div className="container">
        <div className="split-head">
          <h2 id="booking-title">So läuft die Buchung</h2>
          <p className="lead">Vier Schritte von der ersten Nachricht bis zur vollen Tanzfläche.</p>
        </div>

        <ol className="booking-steps">
          {steps.map((step, i) => (
            <li key={step.title} className="booking-step">
              <span className="booking-step-num" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="faq">
          <h3 className="faq-title">Häufige Fragen</h3>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
