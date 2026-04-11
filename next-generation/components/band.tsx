import Image from "next/image";

const bandMembers = [
  { id: "max", name: "Max Mustermann", role: "Gesang & Gitarre", description: "Der Gründer und Frontmann der Band." },
  { id: "anna", name: "Anna Schmidt", role: "Lead-Gesang", description: "Stimmt wie Gold und Partygarant." },
  { id: "thomas", name: "Thomas Weber", role: "Schlagzeug", description: "Hält den Takt und das Publikum in Schwung." },
  { id: "julia", name: "Julia Bauer", role: "Bass", description: "Der soundgebende Bass für den perfekten Groove." },
  { id: "michael", name: "Michael Fischer", role: "Keyboard", description: "Bringt Melodien zum Leben." },
  { id: "sarah", name: "Sarah Wagner", role: "Gesang & Percussion", description: "Sorgt für Stimmung und Energie." },
];

export function BandSection() {
  return (
    <section id="band" className="band-section">
      <p className="band-label">Die Band</p>
      <h2 className="band-title">Lerne uns kennen</h2>
      <p className="band-subtitle">Sechs Musiker, eine Leidenschaft: Gute Musik zum Feiern.</p>
      <p className="band-description">
        Seit Jahren bringt Next Generation Stimmung auf Bühnen in ganz Bayern. 
        Mit einem Mix aus Klassikern und modernen Hits sorgt die Band für 
        unvergessliche Abende bei jedem Anlass.
      </p>

      <div className="band-grid">
        {bandMembers.map((member) => (
          <div key={member.id} className="band-member">
            <div className="band-member-image">
              <Image 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=e53e1a&textColor=ffffff`} 
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
