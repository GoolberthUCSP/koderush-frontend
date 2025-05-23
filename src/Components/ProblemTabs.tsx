// ProblemTabs.tsx
export default function ProblemTabs(props: {
  problems: Problem[],
  currentIndex: number,
  onTabChange: (index: number) => void,
  allowNavigation: boolean
}) {
  return (
    
    <div class="mb-3 text-center">
      {props.problems.map((_, idx) => (
        <button
          onClick={() => {
            if (props.allowNavigation) {
              props.onTabChange(idx);
            }
          }}
          disabled={!props.allowNavigation && idx !== props.currentIndex}
          class={`btn btn-sm me-2 mb-2 ${
            idx === props.currentIndex 
              ? 'btn-primary' 
              : props.allowNavigation
                ? 'btn-outline-secondary'
                : 'btn-outline-secondary disabled'
          }`}
        >
          Problema {idx + 1}
        </button>
      ))}
    </div>
  );
}