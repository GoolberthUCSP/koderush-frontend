import { createSignal, For, Show, onMount } from 'solid-js';
import 'bootstrap/js/dist/tooltip';
import { Tooltip } from 'bootstrap';

interface TestCase {
    input: string;
    output: string;
    explanation: string;
    is_public: number;
}

let socket: WebSocket;

export default function CreateProblem() {
    const [title, setTitle] = createSignal('');
    const [statement, setStatement] = createSignal('');
    const [timeInSeconds, setTimeInSeconds] = createSignal(1);
    const [memoryLimit, setMemoryLimit] = createSignal(256);
    const [inputDescription, setInputDescription] = createSignal('');
    const [outputDescription, setOutputDescription] = createSignal('');
    const [testCases, setTestCases] = createSignal<TestCase[]>([{ input: '', output: '', explanation: '', is_public: 0 }]);
    const [isSubmitting, setIsSubmitting] = createSignal(false);
    const [submitStatus, setSubmitStatus] = createSignal<{ type: 'success' | 'error'; message: string } | null>(null);

    onMount(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(el => new Tooltip(el));

        socket = new WebSocket("wss://ngkia3mb99.execute-api.us-east-1.amazonaws.com/production");

        socket.onopen = () => {
            console.log("WebSocket conectado.");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onmessage = (msg) => {
            console.log("Mensaje del servidor:", msg.data);
        };
    });

    const resetForm = () => {
        setTitle('');
        setStatement('');
        setTimeInSeconds(1);
        setMemoryLimit(256);
        setTestCases([{ input: '', output: '', explanation: '', is_public: 0 }]);
    };

    const handleAddTestCase = () => {
        setTestCases(prev => [...prev, { input: '', output: '', explanation: '', is_public: 0 }]);
    };

    const handleRemoveTestCase = (indexToRemove: number) => {
        setTestCases(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleTestCaseChange = (index: number, field: 'input' | 'output' | 'explanation' | 'is_public', value: string) => {
        setTestCases(prev => {
            console.log(value);
            const newTestCases = [...prev];
            newTestCases[index] = { ...newTestCases[index], [field]: field !== 'is_public' ? field : Number(value === 'true')};
            return newTestCases;
        });
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (isSubmitting()) return;

        setSubmitStatus(null);
        setIsSubmitting(true);

        if (!title() || !statement() || !inputDescription() || !outputDescription() || testCases().some(tc => !tc.input || !tc.output)) {
            setSubmitStatus({ type: 'error', message: 'Completa todos los campos requeridos, incluyendo el Match ID y los casos de prueba.' });
            setIsSubmitting(false);
            return;
        }

        const problemId = `prob-${Date.now()}`;
        const problemData: Object = {
            problem_id: problemId,
            title: title(),
            memory_limit: memoryLimit(),
            time_limit: timeInSeconds(),
            statement: statement(),
            testCases: testCases(),
            input_description: inputDescription(),
            output_description: outputDescription(),
            tutorial: 'Tu puedes!'
        };

        const payload = {
            type: "problem",
            action: "insertData",
            data: problemData
        };

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
            for (let testCase of testCases()) {
                const testCasePayload = {
                    action: "insertData",
                    type: "problem_examples",
                    case: {
                        input: testCase.input,
                        output: testCase.output,
                        explanation: testCase.explanation,
                        is_public: testCase.is_public
                    }
                }
                socket.send(JSON.stringify(testCase));
            }
            console.log("Problema enviado vía WebSocket:", payload);
        } else {
            setSubmitStatus({ type: 'error', message: 'WebSocket no está conectado. Intenta recargar la página.' });
            setIsSubmitting(false);
            return;
        }

        setSubmitStatus({ type: 'success', message: '¡Problema creado con éxito!' });
        resetForm();
        setIsSubmitting(false);
    };

    return (
        <div class="container my-5">
        <div class="card shadow-lg border-0">
        <div class="card-header bg-primary-subtle text-primary-emphasis text-center py-4">
        <h2 class="display-6 fw-bold mb-0">
        <i class="bi bi-journal-plus me-3"></i>
        Crear Problema
        </h2>
        </div>
        <div class="card-body p-lg-5 p-4">
        <form onSubmit={handleSubmit}>
        <Show when={submitStatus()}>
        <div class={`alert ${submitStatus()!.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
        {submitStatus()!.message}
        <button type="button" class="btn-close" onClick={() => setSubmitStatus(null)} aria-label="Close"></button>
        </div>
        </Show>

        <div class="mb-4">
        <label for="problemTitle" class="form-label fw-semibold">Título del Problema</label>
        <input type="text" class="form-control form-control-lg" id="problemTitle" value={title()} onInput={e => setTitle(e.currentTarget.value)} required />
        </div>

        <div class="row g-4 mb-4">
        <div class="col-md-6">
        <label for="timeLimit" class="form-label fw-semibold">Límite de Tiempo</label>
        <div class="input-group">
        <input type="number" class="form-control" id="timeLimit" value={timeInSeconds()} onInput={e => setTimeInSeconds(parseFloat(e.currentTarget.value))} min="1" step="1" />
        <span class="input-group-text">Segundos</span>
        </div>
        </div>
        <div class="col-md-6">
        <label for="memoryLimit" class="form-label fw-semibold">Límite de Memoria</label>
        <div class="input-group">
        <input type="number" class="form-control" id="memoryLimit" value={memoryLimit()} onInput={e => setMemoryLimit(parseInt(e.currentTarget.value, 10))} min="16" />
        <span class="input-group-text">MB</span>
        </div>
        </div>
        </div>

        <div class="mb-4">
        <label for="problemDescription" class="form-label fw-semibold">Enunciado</label>
        <textarea class="form-control" id="problemDescription" rows={6} value={statement()} onInput={e => setStatement(e.currentTarget.value)} required></textarea>
        </div>

        <div class="mb-4">
        <label for="inputDescription" class="form-label fw-semibold">Descripción de la entrada</label>
        <textarea class="form-control" id="inputDescription" rows={3} value={inputDescription()} onInput={e => setInputDescription(e.currentTarget.value)} required></textarea>
        </div>

        <div class="mb-5">
        <label for="outputDescription" class="form-label fw-semibold">Descripcion de la salida</label>
        <textarea class="form-control" id="outputDescription" rows={3} value={outputDescription()} onInput={e => setOutputDescription(e.currentTarget.value)} required></textarea>
        </div>

        <h4 class="mb-3 fw-bold"><i class="bi bi-braces-asterisk me-2"></i>Casos de Prueba</h4>
        <For each={testCases()}>
        {(testCase, index) => (
            <div class="card mb-3 border border-dashed">
            <div class="card-header bg-transparent d-flex justify-content-between align-items-center py-2">
            <span class="fw-bold text-muted">Caso de Prueba #{index() + 1}</span>
            <Show when={testCases().length > 1}>
                <button
                type="button"
                class="btn btn-sm btn-outline-danger border-0"
                onClick={() => handleRemoveTestCase(index())}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Eliminar este caso de prueba"
                >
                <i class="bi bi-trash3 fs-5"></i>
                </button>
            </Show>
            </div>
            <div class="card-body">
            <div class="row g-3">
            <div class="col-md-4">
            <label class="form-label">Entrada</label>
            <textarea class="form-control font-monospace" rows={4} value={testCase.input} onInput={e => handleTestCaseChange(index(), 'input', e.currentTarget.value)} required></textarea>
            </div>
            <div class="col-md-4">
            <label class="form-label">Salida</label>
            <textarea class="form-control font-monospace" rows={4} value={testCase.output} onInput={e => handleTestCaseChange(index(), 'output', e.currentTarget.value)} required></textarea>
            </div>
            <div class="col-md-4">
            <label class="form-label">Explicación</label>
            <textarea class="form-control font-monospace" rows={4} value={testCase.explanation} onInput={e => handleTestCaseChange(index(), 'explanation', e.currentTarget.value)} required></textarea>
            </div>
            </div>
            <div class="form-check mt-3">
                <input id="is_public" type="checkbox" class="form-check-input" checked={testCase.is_public !== 0} onInput={e => handleTestCaseChange(index(), 'is_public', String(e.currentTarget.checked))} required />
                <label class="form-check-label" for="is_public">Mostrar como ejemplo</label>
            </div>
            </div>
            </div>
        )}
        </For>

        <button type="button" class="btn btn-outline-primary" onClick={handleAddTestCase}>
        <i class="bi bi-plus-lg me-2"></i>Añadir Caso de Prueba
        </button>

        <div class="d-grid">
        <button type="submit" class="btn btn-primary btn-lg mt-5" disabled={isSubmitting()}>
        <Show when={!isSubmitting()} fallback={
            <>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Creando...
            </>
        }>
        <i class="bi bi-check-circle-fill me-2"></i>
        Crear Problema
        </Show>
        </button>
        </div>
        </form>
        </div>
        </div>
        </div>
    );
}
