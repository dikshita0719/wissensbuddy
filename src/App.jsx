import { useState } from 'react'
import './App.css'
import { RoleSelection } from './components/RoleSelection'
import { KnowledgeSeekerView } from './components/KnowledgeSeekerView'
import { KnowledgeProviderView } from './components/KnowledgeProviderView'
import { TeamDashboard } from './components/TeamDashboard'
import { BuddyCheck } from './components/BuddyCheck'

// Zeigt den passenden Kontext-Titel in der Kopfzeile je nach aktueller Ansicht.
const roleLabels = {
  'role-selection': 'Startseite',
  seeker: 'Sarafina • Wissensnehmerin (neugierig)',
  provider: 'Inka • Wissensgeberin (Expertin)',
  dashboard: 'Buddy-Dashboard',
  'buddy-check': 'Buddy-Check',
}

function App() {
  const [activeView, setActiveView] = useState('role-selection')
  const [previousView, setPreviousView] = useState('role-selection')
  const [buddyCheckSubmissions, setBuddyCheckSubmissions] = useState([])

  const handleRoleSelection = (role) => {
    setActiveView(role)
  }

  const handleOpenBuddyCheck = () => {
    setPreviousView(activeView)
    setActiveView('buddy-check')
  }

  const handleAddBuddyCheckSubmission = (submission) => {
    setBuddyCheckSubmissions((current) => [
      { ...submission, id: Date.now(), reviewStatus: 'offen' },
      ...current,
    ])
  }

  const handleReviewBuddyCheckSubmission = (id, reviewStatus) => {
    setBuddyCheckSubmissions((current) =>
      current.map((submission) =>
        submission.id === id ? { ...submission, reviewStatus } : submission,
      ),
    )
  }

  const renderView = () => {
    if (activeView === 'seeker') {
      return <KnowledgeSeekerView onBack={() => setActiveView('role-selection')} />
    }

    if (activeView === 'provider') {
      return (
        <KnowledgeProviderView
          onBack={() => setActiveView('role-selection')}
          buddyCheckSubmissions={buddyCheckSubmissions}
          onReviewSubmission={handleReviewBuddyCheckSubmission}
        />
      )
    }

    if (activeView === 'dashboard') {
      return <TeamDashboard onBack={() => setActiveView('role-selection')} />
    }

    if (activeView === 'buddy-check') {
      return (
        <BuddyCheck
          onBack={() => setActiveView(previousView)}
          onSubmit={handleAddBuddyCheckSubmission}
        />
      )
    }

    return (
      <RoleSelection
        onSelectRole={handleRoleSelection}
        onOpenDashboard={() => setActiveView('dashboard')}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="brand-bar">
        <div className="brand-mark">
          <span className="brand-logo">SV</span>
          <div>
            <strong>Wissensbuddy</strong>
            <small>Sparkassen-Versicherung Sachsen • Design-Thinking-Prototyp</small>
          </div>
        </div>
        <span className="brand-context">{roleLabels[activeView]}</span>
        <span className="prototype-badge">MVP • Innovation Challenge</span>
        {activeView !== 'buddy-check' && (
          <button type="button" className="buddy-check-quicklink" onClick={handleOpenBuddyCheck}>
            🩺 Buddy-Check
          </button>
        )}
      </header>

      {/* key erzwingt einen Remount, damit die Übergangsanimation bei jedem Ansichtswechsel neu abspielt */}
      <main className="view-transition" key={activeView}>
        {renderView()}
      </main>
    </div>
  )
}

export default App
