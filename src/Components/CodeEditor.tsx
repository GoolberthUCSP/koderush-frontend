// CodeEditor.tsx
export default function CodeEditor(props: {
  code: string,
  onCodeChange: (code: string) => void,
  onSubmit: () => void
}) {
  return (
    <>
      <div class="mb-3">
        <label class="form-label fw-semibold">Tu solución:</label>
        <textarea
          value={props.code}
          onInput={(e) => props.onCodeChange(e.currentTarget.value)}
          rows={10}
          class="form-control"
          placeholder="// Escribe tu código aquí"
        />
      </div>
      <div class="text-end">
        <button class="btn btn-success" onClick={props.onSubmit}>
          Enviar
        </button>
      </div>
    </>
  );
}