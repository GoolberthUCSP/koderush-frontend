// SubmissionTab.jsx
import { For } from 'solid-js'

export default function SubmissionsTab({ match }: { match: MatchState }) {
  const ownSubmissions = () =>
    [...match.submissions]
      .filter((s) => s.player === match.player)
      .sort((a, b) => b.timestamp - a.timestamp)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString()
  }

  const problemIds = Object.keys(match.problems)

  return (
    <div class="table-responsive">
      <table class="table table-bordered table-sm table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Problema</th>
            <th>Hora</th>
            <th>Veredicto</th>
          </tr>
        </thead>
        <tbody>
          <For each={ownSubmissions()}>
            {(s, i) => (
              <tr>
                <td>{i() + 1}</td>
                <td>{String.fromCharCode(65 + problemIds.indexOf(s.problem_id))}</td>
                <td>{formatTime(s.timestamp)}</td>
                <td>
                  <span class={`badge text-bg-${veredictColor(s.veredict)}`}>
                    {s.veredict}
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

function veredictColor(veredict: string) {
  switch (veredict) {
    case 'accepted': return 'success'
    case 'wrong answer': return 'danger'
    case 'compilation error': return 'warning'
    case 'runtime error': return 'warning'
    case 'time limit exceeded': return 'warning'
    case 'memory limit exceeded': return 'warning'
    case 'waiting': return 'info'
    default: return 'info'
  }
}
