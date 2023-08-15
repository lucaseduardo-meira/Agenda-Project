import React from "react";
import "../assets/css/styles.css";

function Login() {
  return (
    <div className="main-login">
      <div className="left-login">
        <h1>
          Faça login
          <br />E planeje a sua agenda
        </h1>
        <img
          src="../assets/img/schedule.svg"
          className="left-login-image"
          alt="Imagem de calendario"
        />
      </div>
      <div className="right-login">
        <form action="/login" method="post" className="card-login">
          <h1>LOGIN</h1>
          <hr />
          <div className="textfield-login">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              name="username"
              placeholder="Digite seu usuário"
              // onFocus="this.placeholder = ''"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Digite seu usuário")}
              // onBlur="this.placeholder = 'Digite seu usuário'"
            />
          </div>
          <div className="textfield-login">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
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

export default Login;
