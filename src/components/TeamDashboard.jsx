// Teamansicht: gemeinsame Sicht auf Wissensnehmer und Wissensgeber.

import { useEffect, useState } from 'react'

export function TeamDashboard({ onBack }) {
  const overallProgress = 72
  const seekerProgress = 30
  const providerProgress = 80
  const savedHours = 'ca. 2 Stunden'

  // Balken starten bei 0 und füllen sich kurz nach dem Laden auf den Zielwert, für einen sichtbaren Effekt im Pitch.
  const [animated, setAnimated] = useState({ overall: 0, seeker: 0, provider: 0 })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAnimated({ overall: overallProgress, seeker: seekerProgress, provider: providerProgress })
    }, 200)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <section className="team-dashboard">
      <header className="topbar">
        <div>
          <div className="eyebrow">Buddy-Dashboard</div>
          <h2>Teamansicht</h2>
        </div>
        <button type="button" className="back-button" onClick={onBack}>← Zurück</button>
      </header>

      <div className="team-hero">
        <div className="team-card seeker-card">
          <div className="label-row">
            <span>👤 Sarafina (Wissensnehmerin)</span>
            <span className="pill">3/10 Themen</span>
          </div>
          <div className="mini-progress">
            <span style={{ width: `${animated.seeker}%` }} />
          </div>
          <p>Neue Mitarbeitende dokumentieren aktiv und lernen selbst mit Hilfe von Wissensbuddy.</p>
        </div>

        <div className="team-card provider-card">
          <div className="label-row">
            <span>🧑‍🏫 Inka (Wissensgeberin)</span>
            <span className="pill">8/10 geprüft</span>
          </div>
          <div className="mini-progress">
            <span style={{ width: `${animated.provider}%` }} />
          </div>
          <p>Erfahrene Kolleginnen und Kollegen validieren in wenigen Minuten statt lange zu schreiben.</p>
        </div>
      </div>

      <div className="team-summary">
        <div>
          <span className="eyebrow muted">Gemeinsamer Fortschritt</span>
          <h3>{overallProgress}% Team-Fortschritt</h3>
        </div>
        <div className="team-progress-bar">
          <span style={{ width: `${animated.overall}%` }} />
        </div>
      </div>

      <div className="milestone-alert">
        <strong>🎉 Meilenstein erreicht!</strong>
        <span>Wissensgeber-Zeit gespart: {savedHours}</span>
      </div>
    </section>
  )
}
