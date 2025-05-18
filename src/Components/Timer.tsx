// TimerDisplay.tsx
export default function TimerDisplay(props: { timeLeft: number }) {
  const formattedTime = () => {
    const minutes = Math.floor(props.timeLeft / 60);
    const seconds = props.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div class="text-center mb-4">
      <h3 class="text-primary">
        Tiempo restante: {formattedTime()}
      </h3>
    </div>
  );
}