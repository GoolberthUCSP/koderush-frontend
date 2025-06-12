// SubmissionTab.jsx
import { For, createSignal, onMount, Show, createEffect } from 'solid-js'
import { Toast } from './Toast';

export default function SubmissionsTab({ match }: { match: MatchState }) {
  const [showToast, setShowToast] = createSignal(false);
  const [toastMessage, setToastMessage] = createSignal('');
  const [toastType, setToastType] = createSignal('info');
  const [lastSubmissionState, setLastSubmissionState] = createSignal<{
  id: number;
  veredict: string;
}>({ id: -1, veredict: 'none' });
  var initialToast = true;
  
  const ownSubmissions = () => 
    [...match.submissions]
      .filter((s) => s.player === match.player)
      .sort((a, b) => b.timestamp - a.timestamp)

  // Watch for new submissions
  createEffect(() => {
  const submissions = ownSubmissions();
  if (submissions.length > 0) {
    const latest = submissions[0];
    const lastState = lastSubmissionState();
    
    if ((latest.timestamp !== lastState.id || 
        latest.veredict !== lastState.veredict)) {
      if (!initialToast)
      {
        showVerdictNotification(latest.veredict);
        setLastSubmissionState({ id: latest.timestamp, veredict: latest.veredict });
      }
      initialToast = false;
    }
  }
});

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString()
  }

  const showVerdictNotification = (veredict: string) => {
    const messages: Record<string, string> = {
      'accepted': '¡Solución aceptada! ¡Buen trabajo!',
      'wrong answer': 'Respuesta incorrecta. Revisa tu solución.',
      'compilation error': 'Error de compilación. Verifica tu código.',
      'runtime error': 'Error durante la ejecución. Revisa tu código.',
      'time limit exceeded': 'Tiempo límite excedido. Optimiza tu solución.',
      'memory limit exceeded': 'Límite de memoria excedido. Optimiza tu solución.',
      'waiting': 'Tu envío está siendo evaluado...'
    };

    setToastMessage(messages[veredict] || 'Envío procesado');
    setToastType(veredictColor(veredict));
    setShowToast(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => setShowToast(false), 5000);
  };

  const problemIds = Object.keys(match.problems)

  return (
    
    <div class="table-responsive">
      <Show when={showToast()}>
        <Toast 
          message={toastMessage()} 
          type={toastType()} 
          onClose={() => setShowToast(false)} 
        />
      </Show>
      <table class="table table-bordered table-sm table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Problema</th>
            <th>Hora</th>
            <th>Veredicto</th>
          </tr>
        </thead>
        <tbody>
          <For each={ownSubmissions()}>
            {(s, i) => (
              <tr>
                <td>{i() + 1}</td>
                <td>{String.fromCharCode(65 + problemIds.indexOf(s.problem_id))}</td>
                <td>{formatTime(s.timestamp)}</td>
                <td>
                  <span class={`badge text-bg-${veredictColor(s.veredict)}`}>
                    {s.veredict}
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

function veredictColor(veredict: string) {
  switch (veredict) {
    case 'accepted': return 'success'
    case 'wrong answer': return 'danger'
    case 'compilation error': return 'warning'
    case 'runtime error': return 'warning'
    case 'time limit exceeded': return 'warning'
    case 'memory limit exceeded': return 'warning'
    case 'waiting': return 'info'
    default: return 'info'
  }
}
