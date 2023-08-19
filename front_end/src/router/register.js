import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useRegister";
import axios from "axios";
import "../assets/css/styles.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(ev) {
    ev.preventDefault();
    await signup(username, email, password);
  }

  return (
    <div className="main-register">
      <form className="card-register" onSubmit={handleSubmit}>
        <div className="card-header">
          <h1>
            Inscreva-se <br />e planeje a sua agenda
          </h1>
        </div>
        <hr className="hr1" />
        <div className="textfield-register">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            value={username}
            placeholder="Usuário"
            onChange={(ev) => setUsername(ev.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Digite seu usuário")}
          />
        </div>
        <div className="textfield-register">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Digite seu Email")}
          />
        </div>
        <div className="textfield-register">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            value={password}
            placeholder="Senha"
            onChange={(ev) => setPassword(ev.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Digite sua senha")}
          />
        </div>
        <button type="submit" className="btn-register" disabled={isLoading}>
          Registre-se
        </button>
        {error && <div className="error">{error}</div>}
        <hr className="hr2" />
        <a href="/login" className="login-register">
          Já tenho uma conta
        </a>
      </form>
    </div>
  );
}
