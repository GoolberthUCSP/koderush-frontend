// SubmissionTab.jsx
import { For } from 'solid-js'

export default function SubmissionsTab({ submissions, player }: {
    submissions: Submission[],
    player: string
}) {
  const ownSubmissions = () =>
    [...submissions]
      .filter((s) => s.player === player)
      .sort((a, b) => b.timestamp - a.timestamp)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

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
                <td>{String.fromCharCode(65 + i())}</td>
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
