import { Show } from 'solid-js'

export default function WaitingHub({ match }: { match: MatchState }) {
  return (
    <div class="waiting-page container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">

          <h1 class="waiting-title display-4 fw-bold mb-4">
            ¡Esperando a que comience la partida!
          </h1>

          <div class="mb-4">
            <div class="spinner-border text-light custom-spinner" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>

          <Show when={match} fallback={<div class="text-light">Cargando jugadores...</div>}>
            <div class="kahoot-container">
              <h4 class="kahoot-title mb-4">Participantes</h4>

              <div class="d-flex flex-wrap justify-content-center gap-3">
                {match?.players.map((player, index) => (
                  <div class={`player-bubble player-color-4`}>
                    <i class="bi bi-person-fill me-2"></i>{player}
                  </div>
                ))}
              </div>

              <p class="mt-4 text-warning fw-semibold">¡La partida comenzará en breve!</p>
            </div>
          </Show>

          <div class="mt-4">
            <p class="text-light medium">
              Invita a más jugadores compartiendo el código de la sala.<br />
              El juego comenzará automáticamente cuando el anfitrión lo inicie.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}