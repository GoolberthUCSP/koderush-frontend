import Header from './Header';
import Footer from './Footer';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function MainContent() {
    const navigate = useNavigate();
    const [name, setName] = createSignal('');
    const [code, setCode] = createSignal('');

    const handleJoin = (e: Event) => {
        e.preventDefault();
        navigate(`/match?name=${encodeURIComponent(name())}&code=${encodeURIComponent(code())}`);
    };
    return (
        <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
                <h1 class="display-4 fw-bold mb-4">
                    ¡Bienvenido a <span class="text-primary">Koderush</span>!
                </h1>
                <p class="lead mb-4">
                    ¿Listo para llevar tus habilidades de programación al siguiente nivel de la manera más divertida y desafiante? En Koderush, combinamos la emoción de los juegos tipo <span class="text-success">Kahoot!</span> con los desafíos de programación competitiva al estilo <span class="text-info">Codeforces</span>.
                </p>
                <p class="lead mb-4">
                    Aprende conceptos clave, practica algoritmos y compite con otros entusiastas de la programación en tiempo real. ¡Koderush es tu campo de entrenamiento interactivo para convertirte en un maestro del código!
                </p>
                <form class="d-flex w-50 m-auto" role="search" onSubmit={handleJoin}>
                    <input class="form-control me-2"  type="text" placeholder="Nickname" value={name()} onInput={(e) => setName(e.currentTarget.value)} required/>
                    <input class="form-control me-2" type="text" placeholder="Match ID" value={code()} onInput={(e) => setCode(e.currentTarget.value)} required/>
                    <button class="btn btn-outline-success" type="submit">
                    Join
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <div class="row px-5">
            <Header/>
            <hr/>
            <main class="col-md-12 py-3">
                <MainContent />               
            </main>
            <Footer/>
        </div>
  );
}