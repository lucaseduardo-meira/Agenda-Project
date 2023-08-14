import React from "react";
import "../assets/css/register.css";

function Register() {
  return (
    <div class="main-login">
      <form action="/register" method="post" class="card-login">
        <div class="card-header">
          <h1>
            Inscreva-se <br />e planeje a sua agenda
          </h1>
        </div>
        <hr />
        <div class="textfield">
          <label for="username">Usuário</label>
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite seu usuário'"
          />
        </div>
        <div class="textfield">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite seu Email'"
          />
        </div>
        <div class="textfield">
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Digite sua senha'"
          />
        </div>
        <button type="submit" class="btn-login">
          Registre-se
        </button>
        <hr class="hr2" />
        <a href="/login" class="login">
          Já tenho uma conta
        </a>
      </form>
    </div>
  );
}

export default Register;
