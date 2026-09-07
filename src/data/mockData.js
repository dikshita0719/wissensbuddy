// Mock-Daten zur Demonstration des MVP-Pitches.
// Diese Daten simulieren einen realen Wissensfluss ohne Backend oder KI-Anbindung.

export const initialChatMessages = [
  {
    id: 1,
    sender: 'buddy',
    text: 'Hallo! Ich bin Buddy-KI. Ich kann das Intranet & Confluence durchsuchen. Welche Aufgabe oder welchen Prozess möchtest du heute dokumentieren?',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Ich möchte verstehen, wie eine Schadensmeldung in SAP eingegeben wird.',
  },
  {
    id: 3,
    sender: 'buddy',
    text: 'Gerne. Wichtig ist: Erst prüfen, welche Art der Meldung vorliegt, dann die passende Kategorie auswählen und die Dokumentation mit Verweis auf den Ansprechpartner ergänzen.',
  },
]

export const knowledgeDocs = [
  {
    id: 1,
    title: 'Schadensmeldung in SAP',
    owner: 'Maya K.',
    summary: 'Einsteiger-Check für die korrekte Eingabe und erste Prüfung.',
    status: 'neu',
    time: '2 Min',
    confluenceSpace: 'SAP-Prozesse',
  },
  {
    id: 2,
    title: 'Antrag auf Leistungen',
    owner: 'Lukas R.',
    summary: 'Wichtige Schritte, notwendige Unterlagen und typische Fehler.',
    status: 'in Prüfung',
    time: '3 Min',
    confluenceSpace: 'Leistungsabteilung',
  },
  {
    id: 3,
    title: 'Kontaktaufnahme mit Fachbereich',
    owner: 'Nina S.',
    summary: 'Wer ist zuständig, wann sollte ich nachfragen und wie dokumentiere ich es?',
    status: 'fertig',
    time: '1 Min',
    confluenceSpace: 'Fachbereichskontakte',
  },
]

export const teamStats = {
  completedTopics: 3,
  totalTopics: 10,
  seekerReady: 7,
  providerTimeSaved: 2,
}
