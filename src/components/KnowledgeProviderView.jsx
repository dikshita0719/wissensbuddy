// Wissensgeber-Ansicht: kleine, schnelle Prüfung statt aufwändiger Dokumentation.

import { useState } from 'react'

const initialDocs = [
  {
    id: 1,
    title: 'Schadensmeldung in SAP',
    description: 'Einfache Einsteiger-Doku mit klaren Schritten.',
    status: 'neu',
    confluenceSpace: 'SAP-Prozesse',
  },
  {
    id: 2,
    title: 'Antrag auf Leistungen',
    description: 'Kurzfassung mit offenen Fragen zu Nachweisen.',
    status: 'in Prüfung',
    confluenceSpace: 'Leistungsabteilung',
  },
  {
    id: 3,
    title: 'Kontaktaufnahme mit Fachbereich',
    description: 'Klare Zuständigkeiten und hilfreiche Hinweise.',
    status: 'fertig',
    confluenceSpace: 'Fachbereichskontakte',
  },
]

const moodLabels = {
  super: '😄 Super',
  gut: '🙂 Gut',
  ok: '😐 Geht so',
  gestresst: '😕 Gestresst',
  ueberfordert: '😩 Überfordert',
}

export function KnowledgeProviderView({ onBack, buddyCheckSubmissions = [], onReviewSubmission }) {
  const [docs, setDocs] = useState(initialDocs)
  const [justApprovedId, setJustApprovedId] = useState(null)
  const [attachmentsByDoc, setAttachmentsByDoc] = useState({})

  const handleApprove = (id) => {
    setDocs((current) =>
      current.map((doc) => (doc.id === id ? { ...doc, status: 'fertig' } : doc)),
    )
    setJustApprovedId(id)
    window.setTimeout(() => setJustApprovedId(null), 700)
  }

  const handleComment = (id) => {
    setDocs((current) =>
      current.map((doc) => (doc.id === id ? { ...doc, status: 'in Prüfung' } : doc)),
    )
  }

  const handleAttachFiles = (docId, event) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    setAttachmentsByDoc((current) => ({
      ...current,
      [docId]: [
        ...(current[docId] ?? []),
        ...files.map((file) => ({ id: `${Date.now()}-${file.name}`, name: file.name })),
      ],
    }))
    event.target.value = ''
  }

  const removeAttachment = (docId, fileId) => {
    setAttachmentsByDoc((current) => ({
      ...current,
      [docId]: (current[docId] ?? []).filter((file) => file.id !== fileId),
    }))
  }

  return (
    <section className="provider-view">
      <header className="topbar">
        <div>
          <div className="eyebrow">Inka • Wissensgeberin (Expertin)</div>
          <h2>Kurze Freigabe, wenig Aufwand</h2>
        </div>
        <button type="button" className="back-button" onClick={onBack}>← Zurück</button>
      </header>

      <div className="buddy-check-review-panel">
        <div className="panel-header">
          <span>🩺 Buddy-Check Einreichungen von Sarafina</span>
        </div>

        {buddyCheckSubmissions.length === 0 ? (
          <p className="empty-state">Noch keine Buddy-Check-Einreichungen vorhanden.</p>
        ) : (
          <div className="buddy-check-submission-list">
            {buddyCheckSubmissions.map((submission) => (
              <article key={submission.id} className="buddy-check-submission-card">
                <div className="card-header-row">
                  <h3>Testaufgabe vom {new Date(submission.submittedAt).toLocaleString('de-DE')}</h3>
                  <span className={`status-pill ${submission.reviewStatus.replace(' ', '-')}`}>
                    {submission.reviewStatus}
                  </span>
                </div>
                <p className="test-task-prompt">{submission.testTask}</p>
                <p><em>Antwort von Sarafina:</em> {submission.testAnswer || 'Keine Antwort gegeben.'}</p>
                <span className="confluence-badge">
                  {submission.mood ? moodLabels[submission.mood] : '–'} • Stresslevel {submission.stressLevel}/10
                </span>

                <div className="provider-actions">
                  <span className="time-tag">Geschätzte Prüzeit: 2 Min</span>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="approve-btn"
                      onClick={() => onReviewSubmission?.(submission.id, 'geprüft')}
                    >
                      ✅ Passt
                    </button>
                    <button
                      type="button"
                      className="comment-btn"
                      onClick={() => onReviewSubmission?.(submission.id, 'in Prüfung')}
                    >
                      ✏️ Kurz kommentieren
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="provider-list">
        {docs.map((doc) => (
          <article
            key={doc.id}
            className={`provider-card${doc.id === justApprovedId ? ' just-approved' : ''}`}
          >
            <div>
              <div className="card-header-row">
                <h3>{doc.title}</h3>
                <span className={`status-pill ${doc.status.replace(' ', '-')}`}>
                  {doc.status}
                </span>
              </div>
              <p>{doc.description}</p>
              <span className="confluence-badge">📘 Confluence-Space: {doc.confluenceSpace}</span>

              <div className="attachment-row">
                <label className="attach-button">
                  📎 Anhang hinzufügen
                  <input
                    type="file"
                    multiple
                    onChange={(event) => handleAttachFiles(doc.id, event)}
                    hidden
                  />
                </label>
                {(attachmentsByDoc[doc.id] ?? []).length > 0 && (
                  <ul className="attachment-list">
                    {attachmentsByDoc[doc.id].map((file) => (
                      <li key={file.id} className="attachment-chip">
                        <span>📄 {file.name}</span>
                        <button
                          type="button"
                          className="attachment-remove"
                          onClick={() => removeAttachment(doc.id, file.id)}
                          aria-label={`${file.name} entfernen`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="provider-actions">
              <span className="time-tag">Geschätzte Prüfzeit: {doc.id === 1 ? '2 Min' : '3 Min'}</span>
              <div className="action-buttons">
                <button type="button" className="approve-btn" onClick={() => handleApprove(doc.id)}>
                  ✅ Passt
                </button>
                <button type="button" className="comment-btn" onClick={() => handleComment(doc.id)}>
                  ✏️ Kurz kommentieren
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
