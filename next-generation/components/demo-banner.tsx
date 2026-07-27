"use client";

import { useEffect } from "react";

export function DemoBanner() {
  useEffect(() => {
    document.body.classList.add("body-demo-mode");
    return () => {
      document.body.classList.remove("body-demo-mode");
    };
  }, []);

  return (
    <div className="demo-banner">
      <span className="demo-banner-label">Demo</span>
      <span>
        Dies ist eine Vorschau der Webseite und keine offizielle Seite der Band.
      </span>
    </div>
  );
}
