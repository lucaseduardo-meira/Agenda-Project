import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import ContextWrapper from "./context/ContextWrapper";
import { AuthContextProvider } from "./context/AuthContext";

// @ts-ignore
import Login from "./router/Login.js";
import Home from "./router/Home.js";
import Register from "./router/Register.js";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ContextWrapper>
                <Home />
              </ContextWrapper>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
