import { createSignal } from 'solid-js'

export default function CodeEditor({ submitCode, problemId }: {
    submitCode: CallableFunction
    problemId: string,
}) {
  const [code, setCode] = createSignal('')
  const [language, setLanguage] = createSignal('cpp')

  const handleSubmit = () => {
    if (code().trim() !== '') {
      submitCode(problemId, language(), code())
    }
  }

  return (
    <div>
      <label for="languageSelect" class="form-label">Lenguaje:</label>
      <select
        id="languageSelect"
        class="form-select mb-2"
        value={language()}
        onInput={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      <label for="codeEditor" class="form-label">Código:</label>
      <textarea
        id="codeEditor"
        class="form-control"
        rows="20"
        value={code()}
        onInput={(e) => setCode(e.target.value)}
        placeholder="Escribe o pega tu código aquí..."
      ></textarea>

      <button class="btn btn-primary mt-2" onClick={handleSubmit}>
        Enviar
      </button>
    </div>
  )
}
