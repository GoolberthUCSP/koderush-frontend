import { For } from 'solid-js'

export default function ScoreboardTab({ match }: { match: MatchState }) {
  const problemIds = Object.keys(match.problems)
  
  // Obtener lista ordenada de problemas
  const calculateScores = () => {
    const scores: Map<string, any> = new Map();

    for (const player of match.players) {
      scores.set(player, {
        solved: 0,
        lastAcceptedTime: 0,
        problems: {}, // problem_id -> { solved: bool, failedAttempts: number }
      })
      for (const pid of problemIds) {
        scores.get(player).problems[pid] = {
          solved: false,
          tried: false,
          failedAttempts: 0,
        }
      }
    }

    for (const player of match.players) {
      const playerSubs = match.submissions
        .filter((s) => s.player === player && s.veredict !== 'waiting')
        .sort((a, b) => a.timestamp - b.timestamp)

      for (const pid of problemIds) {
        const problemSubs = playerSubs.filter((s) => s.problem_id === pid)
        
        if (problemSubs.length > 0) {
          scores.get(player).problems[pid].tried = true
        }

        let failedAttempts = 0
        let solved = false

        for (const s of problemSubs) {
          if (s.veredict === 'accepted') {
            solved = true
          } else if (!['internal error', 'compilation error'].includes(s.veredict)) {
            failedAttempts++
          }
        }
        scores.get(player).problems[pid].solved = solved
        scores.get(player).problems[pid].failedAttempts = failedAttempts

        if (solved) {
          scores.get(player).solved++
        }
      }
    }

    // Ordenar jugadores por problemas resueltos y luego por jugador (alfabético)
    return Array.from(scores).sort(([a, scoreA], [b, scoreB]) =>
      scoreB.solved !== scoreA.solved
        ? scoreB.solved - scoreA.solved
        : a.localeCompare(b)
    )
  }

  const scoreboard = calculateScores()
  console.log(scoreboard)

  return (
    <div class="table-responsive">
      <table class="table table-bordered table-sm table-hover align-middle text-center">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Resueltos</th>
            {problemIds.map((pid, idx) => (
              <th>{`${String.fromCharCode(65 + idx)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <For each={scoreboard}>
            {([player, score], i) => (
              <tr>
                <td>{i() + 1}</td>
                <td class="text-start">{player}</td>
                <td>{score.solved}</td>
                {problemIds.map((pid) => {
                  const { solved, tried, failedAttempts } = score.problems[pid]
                  if (!tried) {
                    return <td></td>
                  }
                  return (
                    <td class={solved ? 'table-success' : 'table-danger'}>
                      {solved ? '✓' : '✗'} {failedAttempts > 0 ? `(${failedAttempts})` : ''}
                    </td>
                  )
                })}
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
