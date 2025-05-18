// Tutorial.tsx
export default function Tutorial(props: { content: string | null, timeLeft: number }) {
  const formattedTime = () => {
    const minutes = Math.floor(props.timeLeft / 60);
    const seconds = props.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div class="card mt-4">
      <div class="card-header bg-info text-white">
        <h4>Tutorial (Time left: {formattedTime()})</h4>
      </div>
      <div class="card-body" innerHTML={props.content || "No tutorial available"} />
    </div>
  );
}