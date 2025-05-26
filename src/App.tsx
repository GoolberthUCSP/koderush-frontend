import HomePage from "./matchComponents/HomePage"
import Match from "./matchComponents/Match"
import { Router, Route } from '@solidjs/router'
import { render } from 'solid-js/web';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/match" component={Match} />
    </Router>
  )
}

render(() => <App />, document.getElementById('root')!)