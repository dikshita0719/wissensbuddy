// Startbildschirm mit Rollenwahl für Jury und Nutzer.
// Dieser Bereich fokussiert auf Klarheit und schnelle Orientierung.

export function RoleSelection({ onSelectRole, onOpenDashboard }) {
  return (
    <section className="role-selection">
      <div className="intro-card">
        <div className="eyebrow">SV Sachsen • Wissenstransfer</div>
        <h1>Wissen teilen, ohne Zeit zu verlieren</h1>
        <p className="lead">
          Neue Mitarbeitende dokumentieren ihr Lernen selbst – mit einfacher KI-Hilfe.
          Erfahrene Mitarbeitende prüfen nur noch kurz und geben gezielt Feedback.
          Buddy-KI durchsucht dafür das Intranet &amp; Confluence und legt neue
          Dokumentationen direkt dort ab.
        </p>

        <div className="role-grid">
          <button
            type="button"
            className="role-button primary"
            onClick={() => onSelectRole('seeker')}
          >
            <span className="icon">👤</span>
            <span>
              <strong>Ich bin Sarafina</strong>
              <small>Neugierig • Neu im Team • Dokumentation mit KI-Unterstützung</small>
            </span>
          </button>

          <button
            type="button"
            className="role-button secondary"
            onClick={() => onSelectRole('provider')}
          >
            <span className="icon">🧑‍🏫</span>
            <span>
              <strong>Ich bin Inka</strong>
              <small>Expertin • Kurze Freigabe statt langem Schreiben</small>
            </span>
          </button>
        </div>

        <div className="quick-actions">
          <button type="button" className="ghost-button" onClick={onOpenDashboard}>
            📊 Buddy-Dashboard öffnen
          </button>
        </div>

        <div className="security-note" aria-label="Datenschutz Hinweis">
          <span>🔒</span>
          <span>Daten werden sicher &amp; DSGVO-konform gespeichert</span>
        </div>
      </div>
    </section>
  )
}
