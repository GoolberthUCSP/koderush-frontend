import Home from './Components/HomePage';
import WaitingRoom from './Components/WaitingHub';
import Game from './Components/Game';
import { Router, Route } from '@solidjs/router';


function App(){
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/waiting" component={WaitingRoom} />
      <Route path="/game" component={Game} />
    </Router>
  );
}

export default App;