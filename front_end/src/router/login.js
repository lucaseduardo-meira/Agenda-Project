import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../assets/css/styles.css";
import Schedule from "../assets/img/schedule.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function login(ev) {
    ev.preventDefault();
    await axios
      .post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          setRedirect(true);
        } else {
          alert("Wrong credentials");
        }
      });
  }

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>
          Faça login
          <br />E planeje a sua agenda
        </h1>
        <img
          src={Schedule}
          className="left-login-image"
          alt="Imagem de calendario"
        />
      </div>
      <div className="right-login">
        <form className="card-login" onSubmit={login}>
          <h1>LOGIN</h1>
          <hr />
          <div className="textfield-login">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              value={username}
              placeholder="Digite seu usuário"
              onChange={(ev) => setUsername(ev.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Digite seu usuário")}
              // onBlur="this.placeholder = 'Digite seu usuário'"
            />
          </div>
          <div className="textfield-login">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={(ev) => setPassword(ev.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Digite sua senha")}
            />
          </div>
          <button type="submit" className="btn-login">
            login
          </button>
          <hr />
          <a href="/register" className="register-login">
            Cadastre-se <i className="fas fa-angle-double-right"></i>
          </a>
        </form>
      </div>
    </div>
  );
}
