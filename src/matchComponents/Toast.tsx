// Toast.jsx

export function Toast(props: { 
  message: string; 
  type: ToastType; 
  onClose: () => void 
}) {
  // Configuration for each toast type
  const toastConfig = {
    success: {
      bg: "bg-success",
      icon: "✅",
      title: "¡Éxito!",
      animation: "animate-bounce"
    },
    danger: {
      bg: "bg-danger",
      icon: "❌",
      title: "Error",
      animation: "animate-shake"
    },
    warning: {
      bg: "bg-yellow-500",
      icon: "⚠️",
      title: "Advertencia",
      animation: ""
    },
    info: {
      bg: "bg-blue-500",
      icon: "ℹ️",
      title: "Información",
      animation: ""
    }
  };

  const config = toastConfig[props.type];

  return (
    <div class={`flex p-4 toast-notif text-white ${config.bg} ${config.animation}`}>
      <div class="grid">
        <div class="w-50">
          {config.icon}
        </div>
        <div class="w-50">
          <p class="font-bold">{config.title}</p>
        </div>
      </div>
      
      {/* Message (below icon/title) */}
      <div class=""> {/* ml-11 to align with title */}
        <p>{props.message}</p>
      </div>
      
      {/* Close button (top right) */}
      <button
        onClick={props.onClose}
        class=""
      >
        <span class="sr-only">Close</span>
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      {/* Progress bar */}
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
        <div 
          class="h-full bg-white bg-opacity-50 animate-toast-progress"
          style={{ "animation-duration": "5s" }}
        ></div>
      </div>
    </div>
  );
}