import ProblemsTab from './ProblemsTab'
import ScoreboardTab from './ScoreboardTab'
import SubmissionsTab from './SubmissionsTab'

export default function Game({ match, submitCode }: {
  match: MatchState,
  submitCode: CallableFunction
}) {
  return (
    <div class="game-container container my-4">
      <div class="row gy-4">

        {/* Full-width ProblemsTab */}
        <div class="col-12">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Problemas</h5>
              <ProblemsTab match={match} submitCode={submitCode} />
            </div>
          </div>
        </div>

        {/* Scoreboard and Submissions side-by-side on md+, stacked on sm */}
        <div class="col-12 col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Tabla de posiciones</h5>
              <ScoreboardTab match={match} />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Envíos</h5>
              <SubmissionsTab match={match} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
