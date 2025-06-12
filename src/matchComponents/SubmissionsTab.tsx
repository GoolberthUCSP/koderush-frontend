// SubmissionTab.jsx
import { For, createSignal, onMount, Show, createEffect } from 'solid-js'
import { Toast } from './Toast';

interface ToastConfig {
  message: string;
  type: ToastType;
}

export default function SubmissionsTab({ match }: { match: MatchState }) {
  const [showToast, setShowToast] = createSignal(false);
  const [toastConfig, setToastConfig] = createSignal<ToastConfig>({message: 'none', type: 'info'});
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
    console.log(latest.veredict)
    
    if ((latest.timestamp !== lastState.id || 
        latest.veredict !== lastState.veredict)) {
      console.log('diff: ', latest.veredict, " ", lastState.veredict)
      if (!initialToast && latest.veredict !== "waiting")
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
    const messages: Record<string, ToastConfig> = {
      'accepted': {
        message: '¡Solución aceptada! ¡Buen trabajo!',
        type: 'success' as const,
        // You could add more customizations here
      },
      'wrong answer': {
        message: 'Respuesta incorrecta. ¡Sigue intentando!',
        type: 'danger' as const,
      },
      // ... other verdicts
    };

    const config = messages[veredict] || { 
      message: 'Envío procesado', 
      type: 'info' as const 
    };
    setToastConfig(config);
    setShowToast(true);
    
    // Auto-hide after 5 seconds
    //setTimeout(() => setShowToast(false), 5000);
  };

  const problemIds = Object.keys(match.problems)

  return (
    <div>
      <Show when={showToast()}>
        <Toast 
          message={toastConfig().message} 
          type={toastConfig().type} 
          onClose={() => setShowToast(false)} 
        />
      </Show>
      <div class="table-responsive">
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
