export function HomePage() {
    return (
        <div className="row">
            <main className="col-md-9 py-3">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h1 className="display-4 fw-bold mb-4">
                            ¡Bienvenido a <span className="text-primary">Koderush</span>!
                        </h1>
                        <p className="lead mb-4">
                            ¿Listo para llevar tus habilidades de programación al siguiente nivel de la manera más divertida y desafiante? En Koderush, combinamos la emoción de los juegos tipo <span className="text-success">Kahoot!</span> con los desafíos de programación competitiva al estilo <span className="text-info">Codeforces</span>.
                        </p>
                        <p className="lead mb-4">
                            Aprende conceptos clave, practica algoritmos y compite con otros entusiastas de la programación en tiempo real. ¡Koderush es tu campo de entrenamiento interactivo para convertirte en un maestro del código!
                        </p>
                        <button className="btn btn-primary btn-lg"
                            onClick={() => {
                                alert("¡No se que chucha poner!");
                            }}>
                            ¡Comienza tu Aventura Koderush!
                        </button>
                    </div>
                </div>
            </main>
            <aside className="col-md-3 my-3 border-end hiding">
                <div className="sticky-top">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">¿Qué es Koderush?</h5>
                            <p className="card-text">Koderush es una plataforma de aprendizaje y competencia en programación que combina la diversión de los juegos con el desafío de la programación competitiva.</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
  );
}