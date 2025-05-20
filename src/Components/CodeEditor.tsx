// CodeEditor.tsx
import { createSignal, onMount } from "solid-js";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/selection/active-line.js";
// Import the language modes you need
import "codemirror/mode/python/python.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js";

export default function CodeEditor(props: {
  code: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
}) {
  const [currentLanguage, setCurrentLanguage] = createSignal("python");
  let editor: CodeMirror.Editor | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
          if (textareaRef) {
               editor = CodeMirror.fromTextArea(textareaRef, {
                    mode: currentLanguage(),
                    lineNumbers: true,
                    styleActiveLine: true,
                    tabSize: 4,
                    indentUnit: 4,
                    indentWithTabs: false,
                    theme: "default",
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    extraKeys: { Tab: "indentMore" }
               });
          }
          editor?.setValue("Escribe tu código aquí...");
          editor?.focus();
          editor?.execCommand("selectAll");
    });

    const handleLanguageChange = (event: Event) => {
          const target = event.target as HTMLSelectElement;
          const selectedLanguage = target.value;
          setCurrentLanguage(selectedLanguage);
          if (editor) {
               editor.setOption("mode", selectedLanguage);
          }
     };

  return (
    <>
      <div class="d-flex">
          <select class="form-select w-auto mb-2" onChange={handleLanguageChange} name="language">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="text/x-c++src">C++</option>
          </select>
          <button class="btn btn-success mb-2 ms-auto" onClick={props.onSubmit}>
            Enviar solución
          </button>
      </div>
      <div class="card p-2">
          <textarea ref={(el) => (textareaRef = el)} 
          id="editor" 
          name="code"
          value={props.code}
          onInput={(e) => props.onCodeChange(e.currentTarget.value)}
          rows={10}
          class="form-control"
          ></textarea>
      </div>
    </>
  );
}