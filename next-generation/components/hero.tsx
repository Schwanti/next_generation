import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-photo">
        <Image
          src="/background_picture.png"
          alt="Next Generation live im Festzelt, das Publikum mit erhobenen Händen vor der Bühne"
          fill
          priority
          sizes="100vw"
          className="hero-photo-img"
        />
      </div>

      <div className="hero-content container">
        <h1 className="hero-title">
          <span>Live-Musik</span>
          <span>für Ihr <span className="hot">Fest</span></span>
        </h1>
        <div className="hero-foot">
          <p className="hero-subtitle lead">
            Coverband aus Eichstätt: 8 Musiker, über 100 Auftritte in ganz Bayern.
          </p>
          <div className="hero-buttons">
            <a href="#kontakt" className="btn btn-primary">Buchen</a>
            <a href="#services" className="btn btn-ghost">Was wir bieten</a>
          </div>
        </div>
      </div>
    </section>
  );
}
