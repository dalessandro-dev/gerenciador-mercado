import authLogin from "./user/authLogin.js";

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(form);

  let dados = Object.fromEntries(formData.entries());

  console.log(dados);

  authLogin(dados.email, dados.senha);
});
