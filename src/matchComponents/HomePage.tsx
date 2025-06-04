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
        <div class="kahoot-container justify-content-center my-auto row">
            <div class="col-lg-8 text-center d-flex flex-column align-items-center">
                <h1 class="kahoot-title display-2 fw-bold mb-4">
                    <span class="text-brand">Koderush</span>!
                </h1>
                <form class="kahoot-form d-flex flex-column flex-md-col w-100 gap-3" role="search" onSubmit={handleJoin}>
                    <input class="form-control form-input mb-3 mb-md-0 me-md-2" type="text" placeholder="Nickname" value={name()} onInput={(e) => setName(e.currentTarget.value)} required />

                    <input class="form-control form-input mb-3 mb-md-0 me-md-2" type="text" placeholder="Match ID" value={code()} onInput={(e) => setCode(e.currentTarget.value)} required />

                    <button class="btn-join" type="submit">Join</button>
                </form>
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <div class="row px-5">
            <main class="col-md-12 py-3">
                <MainContent />               
            </main>
        </div>
  );
}