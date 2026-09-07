// Buddy-Check: ein kurzes Stimmungs- und Feedback-Check-in für Sarafina.

import { useState } from 'react'

const moodOptions = [
  { value: 'super', emoji: '😄', label: 'Super' },
  { value: 'gut', emoji: '🙂', label: 'Gut' },
  { value: 'ok', emoji: '😐', label: 'Geht so' },
  { value: 'gestresst', emoji: '😕', label: 'Gestresst' },
  { value: 'ueberfordert', emoji: '😩', label: 'Überfordert' },
]

const initialTopics = [
  { id: 'prozesse', label: 'Prozesse verstehen', checked: false },
  { id: 'kontakte', label: 'Ansprechpartner finden', checked: false },
  { id: 'zeit', label: 'Zeit für Dokumentation', checked: false },
  { id: 'tools', label: 'Technische Tools (SAP, Confluence, ...)', checked: false },
  { id: 'sonstiges', label: 'Etwas anderes', checked: false },
]

const testTask =
  'Testaufgabe: Eine neue Kollegin fragt dich, wie man in SAP eine Schadensmeldung anlegt. Erkläre in 2-3 Sätzen die wichtigsten Schritte.'

const getRecommendation = (mood, stressLevel) => {
  if (mood === 'ueberfordert' || stressLevel >= 8) {
    return 'Das klingt nach viel gerade. Sprich am besten kurz mit Inka oder deinem Team – niemand erwartet, dass du alles allein herausfindest. Wissensbuddy hilft dir gern bei den nächsten Schritten.'
  }

  if (mood === 'gestresst' || stressLevel >= 5) {
    return 'Ein bisschen Stress ist normal, wenn viel Neues dazukommt. Nimm dir kurz Zeit für eine Pause und frag Wissensbuddy oder Inka gezielt zu den Themen, die gerade haken – Schritt für Schritt wird es leichter.'
  }

  return 'Klingt gut! Mach weiter so und dokumentiere dein Wissen, solange es frisch ist – dein Buddy-Team ist bei Fragen jederzeit da.'
}

export function BuddyCheck({ onBack, onSubmit }) {
  const [mood, setMood] = useState(null)
  const [stressLevel, setStressLevel] = useState(5)
  const [topics, setTopics] = useState(initialTopics)
  const [otherTopicDetail, setOtherTopicDetail] = useState('')
  const [positiveFeedback, setPositiveFeedback] = useState('')
  const [message, setMessage] = useState('')
  const [testAnswer, setTestAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleTopic = (id) => {
    setTopics((current) =>
      current.map((topic) => (topic.id === id ? { ...topic, checked: !topic.checked } : topic)),
    )
  }

  const handleSubmit = () => {
    onSubmit?.({
      mood,
      stressLevel,
      topics: topics.filter((topic) => topic.checked).map((topic) => topic.label),
      otherTopicDetail,
      positiveFeedback,
      message,
      testTask,
      testAnswer,
      submittedAt: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  const handleRestart = () => {
    setMood(null)
    setStressLevel(5)
    setTopics(initialTopics)
    setOtherTopicDetail('')
    setPositiveFeedback('')
    setMessage('')
    setTestAnswer('')
    setSubmitted(false)
  }

  const isOtherTopicChecked = topics.find((topic) => topic.id === 'sonstiges')?.checked

  return (
    <section className="buddy-check">
      <header className="topbar">
        <div>
          <div className="eyebrow">Buddy-Check • Feedback-Gespräch für Sarafina</div>
          <h2>Kurzes Stimmungs-Check-in im Team</h2>
        </div>
        <button type="button" className="back-button" onClick={onBack}>← Zurück</button>
      </header>

      {!submitted ? (
        <div className="buddy-check-card">
          <div className="check-question">
            <h3>Wie fühlst du dich gerade?</h3>
            <div className="mood-selector">
              {moodOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`mood-option${mood === option.value ? ' selected' : ''}`}
                  onClick={() => setMood(option.value)}
                >
                  <span className="mood-emoji">{option.emoji}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="check-question">
            <h3>Wie hoch ist dein Stresslevel gerade?</h3>
            <div className="stress-slider-row">
              <span>🧘</span>
              <input
                type="range"
                min="0"
                max="10"
                value={stressLevel}
                onChange={(event) => setStressLevel(Number(event.target.value))}
                aria-label="Stresslevel"
              />
              <span>🔥</span>
              <span className="stress-value">{stressLevel}/10</span>
            </div>
          </div>

          <div className="check-question">
            <h3>Bei welchen Themen hakt es gerade?</h3>
            <div className="checkbox-grid">
              {topics.map((topic) => (
                <label key={topic.id} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={topic.checked}
                    onChange={() => toggleTopic(topic.id)}
                  />
                  {topic.label}
                </label>
              ))}
            </div>
            {isOtherTopicChecked && (
              <textarea
                className="other-topic-detail"
                value={otherTopicDetail}
                onChange={(event) => setOtherTopicDetail(event.target.value)}
                placeholder="Beschreibe kurz, worum es geht..."
                aria-label="Beschreibung des Problems"
              />
            )}
          </div>

          <div className="check-question">
            <h3>Was lief besonders gut?</h3>
            <textarea
              value={positiveFeedback}
              onChange={(event) => setPositiveFeedback(event.target.value)}
              placeholder="Was hat diese Woche besonders gut geklappt? (optional)..."
              aria-label="Was lief besonders gut"
            />
          </div>

          <div className="check-question">
            <h3>Möchtest du Inka oder Wissensbuddy noch etwas mitteilen?</h3>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Deine Frage oder Sorge (optional)..."
              aria-label="Nachricht an Inka oder Wissensbuddy"
            />
          </div>

          <div className="check-question">
            <h3>🧪 Testaufgabe zum Stresstest</h3>
            <p className="test-task-prompt">{testTask}</p>
            <textarea
              value={testAnswer}
              onChange={(event) => setTestAnswer(event.target.value)}
              placeholder="Deine Antwort auf die Testaufgabe..."
              aria-label="Antwort auf die Testaufgabe"
            />
            <span className="test-task-hint">
              Inka prüft deine Antwort im Nachgang und gibt dir kurzes Feedback.
            </span>
          </div>

          <button
            type="button"
            className="buddy-check-submit"
            onClick={handleSubmit}
            disabled={!mood}
          >
            🩺 Buddy-Check auswerten
          </button>
        </div>
      ) : (
        <div className="buddy-check-card buddy-check-result">
          <h3>Danke, dass du dir Zeit genommen hast!</h3>
          <p className="check-recommendation">{getRecommendation(mood, stressLevel)}</p>

          {topics.some((topic) => topic.checked) && (
            <div className="check-summary">
              <strong>Offene Themen:</strong>
              <ul>
                {topics
                  .filter((topic) => topic.checked)
                  .map((topic) => (
                    <li key={topic.id}>{topic.label}</li>
                  ))}
              </ul>
              {isOtherTopicChecked && otherTopicDetail.trim() && (
                <p>{otherTopicDetail}</p>
              )}
            </div>
          )}

          {positiveFeedback.trim() && (
            <div className="check-summary">
              <strong>Was gut lief:</strong>
              <p>{positiveFeedback}</p>
            </div>
          )}

          {message.trim() && (
            <div className="check-summary">
              <strong>Deine Nachricht an Inka/Wissensbuddy:</strong>
              <p>{message}</p>
            </div>
          )}

          {testAnswer.trim() && (
            <div className="check-summary">
              <strong>Testaufgabe:</strong>
              <p>{testTask}</p>
              <p><em>Deine Antwort:</em> {testAnswer}</p>
              <span className="confluence-badge">📋 An Inka zur Prüfung gesendet</span>
            </div>
          )}

          <div className="buddy-check-actions">
            <button type="button" className="ghost-button" onClick={handleRestart}>
              🔄 Erneut ausfüllen
            </button>
            <button type="button" className="back-button" onClick={onBack}>← Zurück zur Startseite</button>
          </div>
        </div>
      )}
    </section>
  )
}
