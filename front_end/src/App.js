import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ContextWrapper from "./context/ContextWrapper";

// @ts-ignore
import Login from "./router/Login";
import Home from "./router/Home";
import Register from "./router/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Router exact path="/">
          <ContextWrapper>
            <Home />
          </ContextWrapper>
        </Router>
      </Switch>

      <Switch>
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
