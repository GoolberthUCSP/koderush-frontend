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
      title: "Respuesta Incorrecta",
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
    <div class={`flex p-3 toast-notif text-white ${config.bg} ${config.animation}`}>
      <div>
        <div class="">
          <p class="font-bold">{config.icon} {config.title}</p>
        </div>
      </div>
      
      {/* Message (below icon/title) */}
      <div class=""> {/* ml-11 to align with title */}
        <p>{props.message}</p>
      </div>
      
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