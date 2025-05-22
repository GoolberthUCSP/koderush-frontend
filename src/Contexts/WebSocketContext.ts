import { createSignal, createContext, useContext } from "solid-js";

type WebSocketContextType = {
     connect: (ip: string, port: string) => void;
     disconnect: () => void;
     sendMessage: (message: string) => void;
     messages: () => string[];
     isConnected: () => boolean;
     error: () => string | null;
};

const WebSocketContext = createContext<WebSocketContextType>();

export function WebSocketProvider(props: { children: any }) {
     const [messages, setMessages] = createSignal<string[]>([]);
     const [isConnected, setIsConnected] = createSignal(false);
     const [error, setError] = createSignal<string | null>(null);
     let socket: WebSocket | null = null;

     const connect = (ip: string, port: string) => {
          if (socket && socket.readyState === WebSocket.OPEN) {
               setError("WebSocket is already connected.");
               return;
          }
          setIsConnected(false);
          
          socket = new WebSocket(`http://${ip}:${port}`, 'http');
          let connTimeout: ReturnType<typeof setTimeout> | null = null;
          connTimeout = setTimeout(() => {
               if (socket && socket.readyState === WebSocket.CONNECTING) {
                    setError("Connection timed out");
                    socket.close();
                    socket = null;
                    setIsConnected(false);
               }
          }, 2000);

          socket.onopen = () => {
               console.log("WebSocket connected");
               clearTimeout(connTimeout);
               setIsConnected(true);
          };
          socket.onmessage = (event) => {
               console.log("Message received:", event.data);
               setMessages((prev) => [...prev, event.data]);
          };
          socket.onclose = () => {
               console.log("WebSocket disconnected");
               setIsConnected(false);
          };
          socket.onerror = (error) => {
               setError(`WebSocket error: ${error}`);
               setIsConnected(false);
          };
     };

     const disconnect = () => {
          if (socket) {
               socket.close();
               socket = null;
          }
     };
     const sendMessage = (message: string) => {
          if (socket && socket.readyState === WebSocket.OPEN) {
               socket.send(message);
          } else {
               console.warn("WebSocket is not connected.");
          }
     };

     const contextValue : WebSocketContextType = {
          connect,
          disconnect,
          sendMessage,
          messages,
          isConnected,
          error,
     };

     return WebSocketContext.Provider({
          value: contextValue,
          get children() {
               return props.children;
          }
     });
}

export function useWebSocket() {
     const context = useContext(WebSocketContext);
     if (!context) {
          throw new Error("useWebSocket must be used within a WebSocketProvider");
     }
     return context;
}