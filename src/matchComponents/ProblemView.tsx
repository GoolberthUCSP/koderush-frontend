// ProblemView.jsx
import { createSignal, Show } from 'solid-js'

export default function ProblemView({ problem }: { problem: Problem | null}) {
  const [showTutorial, setShowTutorial] = createSignal(false)

  if (!problem) {
    return <div class="alert alert-secondary">No disponible</div>
  }

  return (
    <div>
      <h4>{problem.title}</h4>
      <p><strong>Límite de tiempo:</strong> {problem.time_limit}s</p>
      <p><strong>Límite de memoria:</strong> {problem.memory_limit}MB</p>

      <Show when={problem.tutorial}>
        <div class="mb-3">
          <button
            class="btn btn-outline-primary btn-sm mb-2"
            onClick={() => setShowTutorial(!showTutorial())}
          >
            {showTutorial() ? 'Ocultar tutorial' : 'Mostrar tutorial'}
          </button>
          <div class={`collapse ${showTutorial() ? 'show' : ''}`}>
            <div class="card card-body">
              <pre class="mb-0">{problem.tutorial}</pre>
            </div>
          </div>
        </div>
      </Show>

      <h5>Enunciado</h5>
      <p>{problem.statement}</p>

      <h5>Entrada</h5>
      <p>{problem.input_description}</p>

      <h5>Salida</h5>
      <p>{problem.output_description}</p>

      <h5>Ejemplos</h5>
      <ul class="list-group">
        {problem.examples.map((ex, i) => (
          <li class="list-group-item">
            <strong>Entrada:</strong>
            <pre>{ex.input}</pre>
            <strong>Salida:</strong>
            <pre>{ex.output}</pre>
            {ex.explanation && (
              <>
                <strong>Explicación:</strong>
                <p>{ex.explanation}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
