import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Next Generation",
  description: "Impressum der Coverband Next Generation aus Eichstätt.",
};

export default function ImpressumPage() {
  return (
    <section className="legal-page">
      <div className="legal-content">
        <h1 className="legal-title">Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Next Generation GbR<br />
          Andreas Schwantner<br />
          Buchenhüll 98<br />
          85072 Eichstätt
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:booking@nextgeneration-live.de">
            booking@nextgeneration-live.de
          </a>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Andreas Schwantner<br />
          Buchenhüll 98<br />
          85072 Eichstätt
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
          Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
          unter der Verpflichtung, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          der Seiten verantwortlich.
        </p>
      </div>
    </section>
  );
}
