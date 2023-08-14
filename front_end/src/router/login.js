import React from "react";
import "../assets/css/login.css";

function Login() {
  return (
    <div class="main-login">
      <div class="left-login">
        <h1>
          Faça login
          <br />E planeje a sua agenda
        </h1>
        <img
          src="img/schedule.svg"
          class="left-login-image"
          alt="Imagem de calendario"
        />
      </div>
      <div class="right-login">
        <form action="/login" method="post" class="card-login">
          <h1>LOGIN</h1>
          <hr />
          <div class="textfield">
            <label for="usernam">Usuário</label>
            <input
              type="text"
              name="username"
              placeholder="Digite seu usuário"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Digite seu usuário'"
            />
          </div>
          <div class="textfield">
            <label for="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Digite sua senha'"
            />
          </div>
          <button type="submit" class="btn-login">
            login
          </button>
          <hr />
          <a href="/register" class="register">
            Cadastre-se <i class="fas fa-angle-double-right"></i>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
