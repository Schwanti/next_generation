"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { BandMember } from "@/types/band-member";

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <svg
      className="band-member-initials"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={name}
    >
      <rect width="200" height="200" className="initials-bg" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        dominantBaseline="middle"
        className="initials-text"
      >
        {initials}
      </text>
    </svg>
  );
}

export function BandSection() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/band-members")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setMembers(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="band" className="band-section">
      <div className="container">
        <div className="band-header split-head">
          <h2 className="band-title">Die Band</h2>
          <p className="band-subtitle lead">
            Acht Vollblut-Musikerinnen und -Musiker aus dem Raum Eichstätt, zuhause in
            Rock und Pop. Egal ob Jung oder Alt: Bei uns wird getanzt.
          </p>
        </div>

        <div className="band-grid" aria-busy={loading}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="band-member" aria-hidden="true">
                <div className="band-member-image band-member-skeleton" />
                <div className="band-member-skeleton-text" />
                <div className="band-member-skeleton-text band-member-skeleton-small" />
              </div>
            ))
            : error ? (
              <p className="band-error">
                Die Bandmitglieder konnten gerade nicht geladen werden. Bitte versuchen Sie es später noch einmal.
              </p>
            )
            : members.map((member) => (
              <article key={member.id} className="band-member">
                <div className="band-member-image">
                  {member.image_url ? (
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="band-member-avatar"
                      unoptimized
                    />
                  ) : (
                    <InitialsAvatar name={member.name} />
                  )}
                </div>
                <h3 className="band-member-name">{member.name}</h3>
                <p className="band-member-role">{member.role}</p>
                {member.description && <p className="band-member-description">{member.description}</p>}
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
