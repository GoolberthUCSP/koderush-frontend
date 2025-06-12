// Toast.jsx
import { createSignal, Show } from "solid-js";

export function Toast({ message, type, onClose }) {
  const bgColor = () => {
    switch (type) {
      case 'success': return 'bg-success';
      case 'danger': return 'bg-danger';
      case 'warning': return 'bg-warning';
      case 'info': return 'bg-info';
      default: return 'bg-primary';
    }
  };

  return (
    <div class={`toast show position-fixed top-0 end-0 text-white ${bgColor()}`} style="z-index: 1100;">
      <div class="d-flex">
        <div class="toast-body">
          {message}
        </div>
        <button 
          type="button" 
          class="btn-close btn-close-white me-2 m-auto" 
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}