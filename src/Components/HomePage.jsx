export function HomePage() {
    return (
        <div className="container py-5">
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
                <button className="btn btn-primary btn-lg">
                    ¡Comienza tu Aventura Koderush!
                </button>
            </div>
        </div>
    </div>
  );
}