// Wissensnehmer-Ansicht: Chat-Schnittstelle + Dokumentationsbereich + Fortschritt.
// Die Interaktion ist bewusst einfach und verständlich gehalten.

import { useEffect, useMemo, useRef, useState } from 'react'

const suggestionTemplate = `Aufgabe:
- Bitte beschreibe die Aufgabe kurz und in eigenen Worten.

Vorgehen:
- Nenne die wichtigsten Schritte in der richtigen Reihenfolge.
- Ergänze kritische Hinweise oder Abhängigkeiten.

Wichtige Kontakte:
- Liste die relevanten Personen oder Teams auf.
- Beachte Ansprechpartner für Rückfragen.

Tipps:
- Was hat dir bei der Arbeit geholfen?
- Welche Stolpersteine solltest du vermeiden?
`

const getSimulatedAnswer = (question) => {
  const lower = question.toLowerCase()

  if (lower.includes('sap')) {
    return 'Für SAP ist der Ablauf meist: 1) Meldung identifizieren, 2) geeignete Kategorie wählen, 3) Betroffene Fälle dokumentieren und 4) bei Bedarf Fachbereich kontaktieren. Wenn du magst, kann ich dir dazu eine kurze Vorlage formulieren.'
  }

  if (lower.includes('confluence') || lower.includes('intranet')) {
    return 'Ich habe das Intranet & Confluence durchsucht: Zu diesem Thema gibt es bereits ähnliche Seiten. Ich verlinke sie dir in der Dokumentation und lege deinen neuen Beitrag als Unterseite im passenden Confluence-Space ab.'
  }

  if (lower.includes('prozess') || lower.includes('ablauf')) {
    return 'Ein guter Prozess beginnt mit einer klaren Zielbeschreibung, dann den Ablauf in logischen Schritten, danach die relevanten Kontakte und am Ende die wichtigsten Hinweise für alle weiteren Fälle.'
  }

  return 'Ich würde dich zunächst dazu anleiten, die Aufgabe, die wichtigsten Schritte, die zuständigen Kontakte und einen kurzen Erfahrungs-Tipp zu notieren. So entsteht eine nützliche, leicht verständliche Dokumentation.'
}

// Simulierter Diktat-Text für Browser ohne Web-Speech-API-Unterstützung.
const simulatedDictation =
  'Ich habe heute gelernt, wie man eine Schadensmeldung anlegt und welche Unterlagen dafür nötig sind.'

export function KnowledgeSeekerView({ onBack }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'buddy',
      text: 'Hallo, ich bin Wissensbuddy und kann das Intranet & Confluence durchsuchen. Welche Aufgabe möchtest du heute nicht nur gut machen, sondern auch gut dokumentieren?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [notes, setNotes] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [confluenceStatus, setConfluenceStatus] = useState('idle')
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef(null)
  const [kimFeedStatus, setKimFeedStatus] = useState('idle')

  const totalTopics = 10
  const completedTopics = 3

  const progressPercent = useMemo(
    () => Math.round((completedTopics / totalTopics) * 100),
    [completedTopics, totalTopics],
  )

  // Startet bei 0 und fährt kurz nach dem Laden auf den Zielwert hoch, damit der Balken sichtbar animiert.
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const timeout = window.setTimeout(() => setAnimatedPercent(progressPercent), 200)
    return () => window.clearTimeout(timeout)
  }, [progressPercent])

  const handleAskBuddy = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
    }

    setMessages((current) => [...current, userMessage])
    setInputValue('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'buddy',
          text: getSimulatedAnswer(trimmed),
        },
      ])
      setIsTyping(false)
    }, 900)
  }

  const insertSuggestion = () => {
    setNotes((current) => {
      const nextValue = current ? `${current}\n\n${suggestionTemplate}` : suggestionTemplate
      return nextValue.trim()
    })
  }

  const handleAttachFiles = (event) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    setAttachments((current) => [
      ...current,
      ...files.map((file) => ({ id: `${Date.now()}-${file.name}`, name: file.name })),
    ])
    event.target.value = ''
  }

  const removeAttachment = (id) => {
    setAttachments((current) => current.filter((file) => file.id !== id))
  }

  const handlePublishToConfluence = () => {
    setConfluenceStatus('saving')
    window.setTimeout(() => setConfluenceStatus('saved'), 900)
  }

  const handleFeedToKim = () => {
    setKimFeedStatus('feeding')
    window.setTimeout(() => setKimFeedStatus('fed'), 900)
  }

  const handleToggleDictation = () => {
    const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition

    // Ohne Browser-Unterstützung wird das Diktat simuliert, statt die Funktion auszublenden.
    if (!SpeechRecognitionImpl) {
      setIsRecording(true)
      window.setTimeout(() => {
        setNotes((current) => (current ? `${current}\n${simulatedDictation}` : simulatedDictation))
        setIsRecording(false)
      }, 1400)
      return
    }

    if (isRecording) {
      recognitionRef.current?.stop()
      return
    }

    const recognition = new SpeechRecognitionImpl()
    recognition.lang = 'de-DE'
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
      setNotes((current) => (current ? `${current}\n${transcript}` : transcript))
    }

    recognition.onend = () => setIsRecording(false)
    recognition.onerror = () => setIsRecording(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }

  const handleExtractInfo = () => {
    const trimmed = notes.trim()
    if (!trimmed) return

    const sentences = trimmed
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)

    const extracted = `Wissensbuddy-Extraktion – Wichtigste Punkte:\n${sentences
      .map((sentence) => `- ${sentence}`)
      .join('\n')}`

    setNotes((current) => `${current}\n\n${extracted}`)
  }

  return (
    <section className="workspace-layout">
      <header className="topbar">
        <div>
          <div className="eyebrow">Sarafina • Wissensnehmerin (neugierig)</div>
          <h2>Persönlicher Wissensraum</h2>
        </div>
        <button type="button" className="back-button" onClick={onBack}>← Zurück</button>
      </header>

      <div className="progress-panel">
        <div className="progress-text">
          <strong>{completedTopics} von {totalTopics} Themen dokumentiert</strong>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${animatedPercent}%` }} />
        </div>
        <div className="progress-badges">
          <span className="badge success">✅ 3 Themen</span>
          <span className="badge neutral">📌 2 Checklisten</span>
          <span className="badge neutral">💬 1 KI-Hilfe</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="chat-panel">
          <div className="panel-header">
            <span>🤖 Wissensbuddy</span>
            <span className="status-dot">Online</span>
          </div>

          <div className="chat-window">
            {messages.map((message) => (
              <div key={message.id} className={`bubble ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="bubble buddy">
                <span className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleAskBuddy()
              }}
              placeholder="Frage an Wissensbuddy stellen..."
              aria-label="Frage an Wissensbuddy"
              disabled={isTyping}
            />
            <button type="button" onClick={handleAskBuddy} disabled={isTyping}>
              {isTyping ? '...' : 'Senden'}
            </button>
          </div>

          <div className="attachment-row">
            <label className="attach-button">
              📎 Anhang hinzufügen
              <input type="file" multiple onChange={handleAttachFiles} hidden />
            </label>
            {attachments.length > 0 && (
              <ul className="attachment-list">
                {attachments.map((file) => (
                  <li key={file.id} className="attachment-chip">
                    <span>📄 {file.name}</span>
                    <button
                      type="button"
                      className="attachment-remove"
                      onClick={() => removeAttachment(file.id)}
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

        <div className="notes-panel">
          <div className="panel-header">
            <span>📝 Dokumentationsbereich</span>
            <div className="panel-header-actions">
              <button
                type="button"
                className={`mini-button mic-button${isRecording ? ' recording' : ''}`}
                onClick={handleToggleDictation}
              >
                {isRecording ? '🔴 Höre zu...' : '🎤 Per Mikrofon diktieren'}
              </button>
              <button type="button" className="mini-button" onClick={handleExtractInfo} disabled={!notes.trim()}>
                🧠 Wissensbuddy: Infos extrahieren
              </button>
              <button type="button" className="mini-button" onClick={insertSuggestion}>
                Wissensbuddy-Vorschlag einfügen
              </button>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Notiere hier, was du heute gelernt hast..."
            aria-label="Dokumentationstext"
          />

          <div className="confluence-row">
            <span className="confluence-hint">
              🔎 Wissensbuddy nutzt Intranet &amp; Confluence als Wissensquelle und legt fertige
              Dokumentationen dort ab.
            </span>
            <button
              type="button"
              className="confluence-button"
              onClick={handlePublishToConfluence}
              disabled={confluenceStatus === 'saving' || !notes.trim()}
            >
              {confluenceStatus === 'saving' ? 'Speichert...' : '📘 In Confluence veröffentlichen'}
            </button>
            {confluenceStatus === 'saved' && (
              <span className="confluence-badge">✅ In Confluence gespeichert</span>
            )}
          </div>

          <div className="kim-feed-row">
            <span className="confluence-hint">
              🧠 Alternativ kannst du die Dokumentation direkt an KIM füttern, damit das Modell
              daraus lernt und die Inhalte für künftige Antworten nutzt.
            </span>
            <button
              type="button"
              className="kim-feed-button"
              onClick={handleFeedToKim}
              disabled={kimFeedStatus === 'feeding' || !notes.trim()}
            >
              {kimFeedStatus === 'feeding' ? 'Füttert Wissensbuddy...' : '🍽️ An Wissensbuddy füttern'}
            </button>
            {kimFeedStatus === 'fed' && (
              <span className="kim-feed-badge">✅ An KIM übergeben</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
