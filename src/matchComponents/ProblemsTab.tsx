// ProblemsTab.jsx
import { createSignal, For } from 'solid-js'
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'

export default function ProblemsTab({ match, submitCode }: {
    match: MatchState
    submitCode: CallableFunction
}) {
  const problemIds = Object.keys(match.problems)
  const [activeProblem, setActiveProblem] = createSignal(problemIds[0])
  const indexToLetter = (index: number) => String.fromCharCode(65 + index)
  const currentProblem = () => match.problems[activeProblem()];

  return (
    <div class="row">
      <div class="col-2">
        <div class="nav flex-column nav-pills">
        <For each={problemIds}>
            {(id, index) => {
              const problem = match.problems[id]
              return (
                <button
                  class={`nav-link ${activeProblem() === id ? 'active' : ''}`}
                  onClick={(e) => {
                    setActiveProblem(id)
                    console.log(id)
                  }}
                  disabled={!problem}
                >
                  {indexToLetter(index())}
                </button>
              )
            }}
          </For>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-md-6">
            <ProblemView problem={currentProblem} />
          </div>
          <div class="col-md-6">
            <CodeEditor submitCode={submitCode} problemId={activeProblem} />
          </div>
        </div>
      </div>
    </div>
  )
}
