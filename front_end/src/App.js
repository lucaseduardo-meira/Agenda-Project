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
        <Route exact path="/">
          <ContextWrapper>
            <Home />
          </ContextWrapper>
        </Route>
      </Switch>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
