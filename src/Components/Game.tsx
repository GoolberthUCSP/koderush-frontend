import { createSignal, onMount, onCleanup, Show, createEffect } from 'solid-js';
import { store, setStore } from './store';
import { useNavigate } from '@solidjs/router';

export default function Game() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = createSignal('problem');
  const [problemIndex, setProblemIndex] = createSignal(0);
  const [code, setCode] = createSignal('');
  const [timeLeft, setTimeLeft] = createSignal(0);
  let timerInterval: NodeJS.Timeout;

  const currentProblem = () =>
    store.currentMatch?.problems[problemIndex()];

  // Get total time per problem from match settings
  const secondsPerProblem = () => 
    store.currentMatch?.seconds_per_problem || 0;

  // Format time as MM:SS
  const formattedTime = () => {
    const minutes = Math.floor(timeLeft() / 60);
    const seconds = timeLeft() % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle problem timer logic
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleNextProblem();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Move to next problem or end match
  const handleNextProblem = () => {
    if (problemIndex() < (store.currentMatch?.num_problems || 0) - 1) {
      setProblemIndex(p => p + 1);
      setTimeLeft(secondsPerProblem());
    } else {
      navigate('/');
    }
  };

  // Handle code submission
  const handleSubmit = () => {
  if (!store.currentMatch) return;

  // Create new submission with proper type
  const newSubmission: Submission = {
    problem_id: currentProblem()?.problem_id || 0,
    timestamp: Date.now(),
    veredict: 'waiting' // Make sure this matches the Submission type
  };

  // Update store with type-safe approach
  setStore('currentMatch', (match) => match ? {
    ...match,
    submissions: [...match.submissions, newSubmission]
  } : null);

  // Simulate verdict after 2 seconds
  setTimeout(() => {
  setStore('currentMatch', (prevMatch) => {
      if (!prevMatch) return prevMatch;
      
      // Create typed submissions array update
      const updatedSubmissions = prevMatch.submissions.map((sub, index) => {
        if (index === prevMatch.submissions.length - 1) {
          const veredict: typeof sub.veredict = 
            Math.random() > 0.5 ? 'accepted' : 'wrong answer';
          
          return {
            ...sub,
            veredict: veredict
          };
        }
        return sub;
      });

      // Return new match object with proper type
      return {
        ...prevMatch,
        submissions: updatedSubmissions
      } as UserMatch; // Type assertion if needed
    });
  }, 2000);
};

  onMount(() => {
    // Initialize timer with first problem's time
    setTimeLeft(secondsPerProblem());
    startTimer();
  });

  // Reset timer when problem changes
  createEffect(() => {
    problemIndex();
    setTimeLeft(secondsPerProblem());
    startTimer();
  });

  onCleanup(() => {
    clearInterval(timerInterval);
  });

  return (
    <div class="container py-4">
      <div class="text-center mb-4">
        <h3 class="text-primary">
          Tiempo restante: {formattedTime()}
        </h3>
      </div>
      {/* Tabs Navigation */}
      <div class="mb-4 d-flex justify-content-center gap-3">
        <button
          class={`btn btn-outline-primary ${activeTab() === 'problem' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem')}
        >
          Problemas
        </button>
        <button
          class={`btn btn-outline-primary ${activeTab() === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Envíos
        </button>
      </div>

      <Show when={activeTab() === 'problem'}>
        {/* Problem Tabs */}
        <div class="mb-3 text-center">
          {store.currentMatch?.problems.map((_, idx) => (
            <button
              class={`btn btn-sm me-2 mb-2 ${
                idx === problemIndex() ? 'btn-primary' : 'btn-outline-secondary'
              }`}
              onClick={() => setProblemIndex(idx)}
            >
              Problema {idx + 1}
            </button>
          ))}
        </div>

        {/* Problem Content */}
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title">{currentProblem()?.title}</h3>
            <div class="card-text" innerHTML={currentProblem()?.statement} />
            <h5 class="mt-4">Ejemplos</h5>
            {currentProblem()?.examples.map(example => (
              <div class="border rounded p-2 mb-3 bg-light">
                <p><strong>Entrada:</strong> <code>{example.input}</code></p>
                <p><strong>Salida:</strong> <code>{example.output}</code></p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div class="mb-3">
          <label class="form-label fw-semibold">Tu solución:</label>
          <textarea
            value={code()}
            onInput={(e) => setCode(e.currentTarget.value)}
            rows={10}
            class="form-control"
            placeholder="// Escribe tu código aquí"
          />
        </div>
        <div class="text-end">
          <button class="btn btn-success" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </Show>

      <Show when={activeTab() === 'submissions'}>
        <h3 class="mb-3">Envíos recientes</h3>
        <ul class="list-group">
          {store.currentMatch?.submissions.map((sub, i) => (
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
      </Show>
    </div>
  );
}