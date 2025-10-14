import receiveUserData from "./user/authChanged.js";
import logout from "./user/signOut.js";
import { searchUser } from "./user/searchUser.js";

const buttonLogout = document.getElementById("logout-button");
let userEmail = document.getElementById("user-email");

const name = document.getElementById("span-name")
const phone = document.getElementById("span-phone")
const birthDate = document.getElementById("span-birthDate")

receiveUserData(async (data) => {
  if (data) {
    userEmail.textContent = data.email;
    console.log(await data.getIdToken())

    searchUser(data.uid, (user) => {
        if (!user) {
            name.textContent = "Erro ao carregar"
            phone.textContent = "Erro ao carregar"
            birthDate.textContent = "Erro ao carregar"
        }

        name.textContent = user.nome
        phone.textContent = user.telefone
        birthDate.textContent = user.dataDeNascimento
    })

  } else {
    alert("Você não está logado. Redirecionando...");
    window.location.href = "/login";
  }
});

buttonLogout.addEventListener("click", function () {
  logout();
});
