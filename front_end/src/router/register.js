import React from "react";
import "../assets/css/styles.css";

function Register() {
  return (
    <div className="main-register">
      <form action="/register" method="post" className="card-register">
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
            name="username"
            placeholder="Usuário"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (
              (e.target.placeholder = "Digite seu usuário"),
              (e.target.color = "#ff0000")
            )}
          />
        </div>
        <div className="textfield-register">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Digite seu Email")}
          />
        </div>
        <div className="textfield-register">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Digite sua senha")}
          />
        </div>
        <button type="submit" className="btn-register">
          Registre-se
        </button>
        <hr className="hr2" />
        <a href="/login" className="login-register">
          Já tenho uma conta
        </a>
      </form>
    </div>
  );
}

export default Register;
