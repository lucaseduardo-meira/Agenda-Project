import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
