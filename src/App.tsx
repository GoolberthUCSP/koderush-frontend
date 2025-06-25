import HomePage from "./matchComponents/HomePage"
import Match from "./matchComponents/Match"
import CreateProblem from "./matchComponents/CreateProblem"

import { Router, Route, HashRouter } from '@solidjs/router'
import { render } from 'solid-js/web';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <HashRouter>
      <Route path="/" component={HomePage} />
      <Route path="/match" component={Match} />
      <Route path="/createproblem" component={CreateProblem} />
    </HashRouter>
  )
}

render(() => <App />, document.getElementById('root')!)
