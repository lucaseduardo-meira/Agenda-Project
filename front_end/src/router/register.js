import React from "react";
import "../assets/css/styles.css";

function Register() {
  return (
    <div class="main-register">
      <form action="/register" method="post" class="card-register">
        <div class="card-header">
          <h1>
            Inscreva-se <br />e planeje a sua agenda
          </h1>
        </div>
        <hr class="hr1" />
        <div class="textfield-register">
          <label for="username">Usuário</label>
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite seu usuário'"
          />
        </div>
        <div class="textfield-register">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite seu Email'"
          />
        </div>
        <div class="textfield-register">
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite sua senha'"
          />
        </div>
        <button type="submit" class="btn-register">
          Registre-se
        </button>
        <hr class="hr2" />
        <a href="/login" class="login-register">
          Já tenho uma conta
        </a>
      </form>
    </div>
  );
}

export default Register;
