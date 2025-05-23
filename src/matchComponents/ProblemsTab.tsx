// ProblemsTab.jsx
import { createSignal, For } from 'solid-js'
import ProblemView from './ProblemView'
import CodeEditor from './CodeEditor'

export default function ProblemsTab({ problems, submitCode }: {
    problems: { [problem_id: string]: Problem | null }
    submitCode: CallableFunction
}) {
  const problemIds = Object.keys(problems)
  const [activeProblem, setActiveProblem] = createSignal(problemIds[0])
  const indexToLetter = (index: number) => String.fromCharCode(65 + index)

  return (
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills">
        <For each={problemIds}>
            {(id, index) => {
              const problem = problems[id]
              return (
                <button
                  class={`nav-link ${activeProblem() === id ? 'active' : ''}`}
                  onClick={() => setActiveProblem(id)}
                  disabled={!problem}
                >
                  {indexToLetter(index())}
                </button>
              )
            }}
          </For>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-md-6">
            <ProblemView problem={problems[activeProblem()]} />
          </div>
          <div class="col-md-6">
            <CodeEditor submitCode={submitCode} problemId={activeProblem()} />
          </div>
        </div>
      </div>
    </div>
  )
}
