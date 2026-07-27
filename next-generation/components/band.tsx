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
      width={200}
      height={200}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={name}
    >
      <rect width="200" height="200" rx="100" fill="#e53e1a" />
      <text
        x="100"
        y="108"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="72"
        fontWeight="700"
        fontFamily="var(--font-barlow), sans-serif"
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
      <p className="band-label">Die Band</p>
      <h2 className="band-title">Lerne uns kennen</h2>
      <p className="band-subtitle">
        &bdquo;Next Generation&rdquo; ist eine Coverband aus dem Raum Eichstätt mit
        musikalischem Schwerpunkt auf Rock- und Popmusik.
      </p>

      <div className="band-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="band-member">
              <div className="band-member-image band-member-skeleton" />
              <div className="band-member-skeleton-text" />
              <div className="band-member-skeleton-text band-member-skeleton-small" />
            </div>
          ))
          : error ? (
            <p style={{ gridColumn: "1 / -1", color: "#666", padding: "2rem 0" }}>
              Die Bandmitglieder konnten gerade nicht geladen werden. Bitte versuch es später nochmal.
            </p>
          )
          : members.map((member) => (
            <div key={member.id} className="band-member">
              <div className="band-member-image">
                {member.image_url ? (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="band-member-avatar"
                    unoptimized
                  />
                ) : (
                  <InitialsAvatar name={member.name} />
                )}
              </div>
              <h3 className="band-member-name">{member.name}</h3>
              <p className="band-member-role">{member.role}</p>
              <p className="band-member-description">{member.description}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
