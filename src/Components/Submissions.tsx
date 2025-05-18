// SubmissionsList.tsx
export default function SubmissionsList(props: { submissions: Submission[] }) {
  return (
    <>
      <h3 class="mb-3">Envíos recientes</h3>
      <ul class="list-group">
        {props.submissions.map((sub, i) => (
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <i class="bi bi-code-slash me-2" />
              Problema {sub.problem_id}
            </span>
            <span>
              {new Date(sub.timestamp).toLocaleString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span
              class={`badge ${
                sub.veredict === 'accepted'
                  ? 'bg-success'
                  : sub.veredict === 'waiting'
                  ? 'bg-warning text-dark'
                  : 'bg-danger'
              }`}
            >
              {sub.veredict}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}