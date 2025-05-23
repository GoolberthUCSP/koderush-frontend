// Game.tsx (main component)
import { createSignal } from 'solid-js'
import ProblemsTab from './ProblemsTab'
import ScoreboardTab from './ScoreboardTab'
import SubmissionsTab from './SubmissionsTab'

export default function Game({ match, submitCode }: {
    match: MatchState,
    submitCode: CallableFunction
}) {
  const [activeTab, setActiveTab] = createSignal('problemas')

  return (
    <div class="container mt-3">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button class={`nav-link ${activeTab() === 'problemas' ? 'active' : ''}`} onClick={() => setActiveTab('problemas')}>Problemas</button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${activeTab() === 'tabla' ? 'active' : ''}`} onClick={() => setActiveTab('tabla')}>Tabla de posiciones</button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${activeTab() === 'envios' ? 'active' : ''}`} onClick={() => setActiveTab('envios')}>Envíos</button>
        </li>
      </ul>

      <div class="tab-content mt-3">
        {activeTab() === 'problemas' && (
          <ProblemsTab problems={match.problems} submitCode={submitCode} />
        )}

        {activeTab() === 'tabla' && (
          <ScoreboardTab submissions={match.submissions} players={match.players} problems={match.problems}/>
        )}

        {activeTab() === 'envios' && (
          <SubmissionsTab submissions={match.submissions} player={match.player} />
        )}
      </div>
    </div>
  )
}