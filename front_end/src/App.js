import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./router/Home";
import Login from "./router/Login";
import Register from "./router/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Router exact path="/">
          <Home />
        </Router>
        <Router path="/login">
          <Login />
        </Router>
        <Router path="/register">
          <Register />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
