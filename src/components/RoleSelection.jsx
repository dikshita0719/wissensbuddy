// Startbildschirm mit Rollenwahl für Jury und Nutzer.
// Dieser Bereich fokussiert auf Klarheit und schnelle Orientierung.

export function RoleSelection({ onSelectRole, onOpenDashboard }) {
  return (
    <section className="role-selection">
      <div className="intro-card">
        <div className="intro-layout">
          <div className="intro-copy">
            <div className="eyebrow">SV Sachsen • Wissenstransfer</div>
            <h1>Wissen teilen, ohne Zeit zu verlieren</h1>
            <p className="lead">
              Neue Mitarbeitende dokumentieren ihr Lernen selbst – mit einfacher KI-Hilfe.
              Erfahrene Mitarbeitende prüfen nur noch kurz und geben gezielt Feedback.
              Buddy-KI macht aus einzelnen Erfahrungen auffindbares Teamwissen.
            </p>
          </div>

          <aside className="prototype-panel" aria-label="Wissensbuddy Prozess">
            <div className="prototype-panel-top">
              <span className="signal-dot" />
              <span>Wissensfluss aktiv</span>
              <span className="prototype-label">DEMO</span>
            </div>
            <div className="flow-stack">
              <div className="flow-step"><span>01</span><strong>Erleben</strong><small>Aufgabe im Alltag</small></div>
              <div className="flow-line" />
              <div className="flow-step"><span>02</span><strong>Festhalten</strong><small>Mit Buddy-Unterstützung</small></div>
              <div className="flow-line" />
              <div className="flow-step"><span>03</span><strong>Teilen</strong><small>Für das ganze Team</small></div>
            </div>
            <p className="prototype-note">Ein Konzept für Wissen, das dort bleibt, wo es entsteht.</p>
          </aside>
        </div>

        <div className="impact-strip" aria-label="Prototyp-Fokus">
          <div><strong>01</strong><span>Wissen festhalten</span></div>
          <div><strong>02</strong><span>Gezielt prüfen</span></div>
          <div><strong>03</strong><span>Schneller wiederfinden</span></div>
        </div>

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

        <div className="security-note" aria-label="Prototyp Hinweis">
          <span>✦</span>
          <span>Demo-Daten • Keine Live-Anbindung • Für die Challenge gebaut</span>
        </div>
      </div>
    </section>
  )
}
