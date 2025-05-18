// socket.ts
import { setStore } from "./store";
import { mockServerMatch } from "./mockdata";

let socket: WebSocket | null = null;
let mockInterval: number; // For testing

// Mock function for testing
export function connectToMatch(username: string, code: string) {
  // Simulate server response delay
  setTimeout(() => {
    // Create fresh match copy
    const match: ServerMatch = {
      ...mockServerMatch,
      users: [...mockServerMatch.users, username]
    };
    
    // Transform to UserMatch and update store
    setStore('currentMatch', match);
    
    // Simulate other players joining
    mockInterval = window.setInterval(() => {
      setStore('currentMatch', 'users', (users) => [
        ...users,
        `Player${Math.floor(Math.random() * 100)}`
      ]);
    }, 2000);

    // Simulate game start after 10 seconds
    setTimeout(() => {
      clearInterval(mockInterval);
      const startedMatch: ServerMatch = {
        ...mockServerMatch,
        start_timestamp: Date.now()
      };
      setStore('currentMatch', startedMatch);
    }, 10000);
  }, 500);
}

/* ACTUAL IMPLEMENTATION 
export function connectToMatch(username: string, code: string) {
  socket = new WebSocket(`ws://your-backend-url/${code}`);

  socket.onmessage = (event) => {
    const message: UserMessage = JSON.parse(event.data);
    
    if (message.dtype === 'state_update') {
      const matchData = message.data as UserMatch;
      setStore('currentMatch', matchData);
      
      // Handle state update
    } else {
      // Handle notifications
      console.log('Notification:', message.data);
    }
  };

  socket.onopen = () => {
    // Send initial join message
    socket?.send(JSON.stringify({
      type: 'join',
      user: username,
      code: code
    }));
  };
}
*/