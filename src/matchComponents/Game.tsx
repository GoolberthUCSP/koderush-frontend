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
              <h3 class="card-title">Problemas</h3>
              <ProblemsTab match={match} submitCode={submitCode} />
            </div>
          </div>
        </div>

        {/* Scoreboard and Submissions side-by-side on md+, stacked on sm */}
        <div class="col-12 col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title text-center">Tabla de posiciones</h3>
              <ScoreboardTab match={match} />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title text-center">Envíos</h3>
              <SubmissionsTab match={match} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
