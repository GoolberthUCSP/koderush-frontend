// ProblemContent.tsx
export default function ProblemContent(props: { problem?: ServerProblem }) {
  return (
    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title">{props.problem?.title}</h3>
        <div class="card-text" innerHTML={props.problem?.statement} />
        <h5 class="mt-4">Ejemplos</h5>
        {props.problem?.examples.map(example => (
          <div class="border rounded p-2 mb-3 bg-light">
            <p><strong>Entrada:</strong> <code>{example.input}</code></p>
            <p><strong>Salida:</strong> <code>{example.output}</code></p>
          </div>
        ))}
      </div>
    </div>
  );
}