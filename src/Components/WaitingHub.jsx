import {Show} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { store } from './store';
import { onCleanup, onMount } from 'solid-js';
import Header from './Header';

export default function WaitingHub({ match }) {
    const navigate = useNavigate();
    const startGame = () => navigate('/game'); //Should be triggerd by the websocket message

    // For testing
    onMount(() => {
    const timer = setInterval(() => {
        if (store.currentMatch?.start_timestamp) {
            console.log('Game started');
            navigate('/game');
        }
    }, 2000);

    onCleanup(() => clearInterval(timer));
    });


    return (
        <div className="container py-2">
            <Header></Header>
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">

                <h1 className="display-4 fw-bold text-primary mb-4">
                    ¡Esperando a que comience la partida!
                </h1>

                <div className="mb-4">
                    <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>

                <Show when={store.currentMatch} fallback={<div className="text-muted">Cargando jugadores...</div>}>
                    <div className="mb-4">
                    <h4 className="fw-semibold mb-3">Participantes</h4>
                    <ul className="list-group list-group-flush">
                        {store.currentMatch?.users.map(user => (
                        <li className="list-group-item" key={user}>
                            <i className="bi bi-person-fill me-2"></i>{user}
                        </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-success fw-semibold">La partida comenzará en breve...</p>
                    </div>
                </Show>

                <div className="mt-4">
                    <p className="text-muted">
                    Invita a más jugadores compartiendo el código de la sala.<br />
                    El juego comenzará automáticamente cuando el anfitrión lo inicie.
                    </p>
                </div>

                </div>
            </div>
        </div>
    );
}