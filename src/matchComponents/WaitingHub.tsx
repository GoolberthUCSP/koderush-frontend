import { Show } from 'solid-js'

export default function WaitingHub({ match }: MatchStateProp) {
  return (
    <div class="container py-2">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">

        <h1 class="display-4 fw-bold text-primary mb-4">
          ¡Esperando a que comience la partida!
        </h1>

        <div class="mb-4">
          <div class="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
          <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <Show when={match} fallback={<div class="text-muted">Cargando jugadores...</div>}>
          <div class="mb-4">
          <h4 class="fw-semibold mb-3">Participantes</h4>
          <ul class="list-group list-group-flush">
            {match?.players.map(player => (
            <li class="list-group-item">
              <i class="bi bi-person-fill me-2"></i>{player}
            </li>
            ))}
          </ul>
          <p class="mt-3 text-success fw-semibold">La partida comenzará en breve...</p>
          </div>
        </Show>

        <div class="mt-4">
          <p class="text-muted">
          Invita a más jugadores compartiendo el código de la sala.<br />
          El juego comenzará automáticamente cuando el anfitrión lo inicie.
          </p>
        </div>

        </div>
      </div>
    </div>
  )
}