"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { BandMember } from "@/types/band-member";

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
        „Next Generation“ ist eine Coverband aus dem Raum Eichstätt mit
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
                <Image
                  src={
                    member.image_url ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=e53e1a&textColor=ffffff`
                  }
                  alt={member.name}
                  width={200}
                  height={200}
                  className="band-member-avatar"
                  unoptimized
                />
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
