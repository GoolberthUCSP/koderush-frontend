import HomePage from "./matchComponents/HomePage"
import Match from "./matchComponents/Match"
import { Router, Route } from '@solidjs/router'

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/match" component={Match} />
    </Router>
  )
}

export default App