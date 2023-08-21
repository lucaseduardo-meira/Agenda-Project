import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import ContextWrapper from "./context/ContextWrapper";
import { AuthContextProvider } from "./context/AuthContext";

// @ts-ignore
import Login from "./router/Login";
import Home from "./router/Home";
import Register from "./router/Register";

function App() {
  const { user } = useAuthContext();
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
