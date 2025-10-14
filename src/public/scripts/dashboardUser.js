import { adminCreateUser } from "./user/adminCreateUser.js";
import receiveUserData from "./user/authChanged.js";
import logout from "./user/signOut.js";
import { getUser } from "./user/getUser.js";
import { deleteUser } from "./user/deleteUser.js";
import { updateUser } from "./user/updateUser.js";

let span = document.getElementById("user-email");

const form = document.getElementById("user-form");
const buttonLogout = document.getElementById("logout-button");
const tableBody = document.getElementById("table-users-body");


receiveUserData(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();

    if (!idTokenResult.claims.isAdmin) {
        alert("Você não tem permissão para acessar essa página.");
        window.location.href = "/login";
    }

    span.textContent = user.email;
    console.log(await user.getIdToken())
    
    getUser((data) => {
      if (data) {
        data.forEach((user) => {
            const typeUserTable = user.isAdmin ? "Administrador" : "Usuário"
            const typeUserValue = user.isAdmin ? "admin" : "user"
            const rowTable = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.nome}</td>
                            <td>${user.email}</td>
                            <td>${user.telefone}</td>
                            <td>${typeUserTable}</td>
                            <td>${user.dataDeNascimento}</td>
                            <td>${user.criadoEm}</td>
                            <td>
                                <button class='btn-edit'
                                data-id='${user.id}'
                                data-name='${user.nome}'
                                data-email='${user.email}'
                                data-phone='${user.telefone}'
                                data-typeUser='${typeUserValue}'
                                data-birthDate='${user.dataDeNascimento}'
                                data-createdAt='${user.criadoEm}'>editar</button>
                            </td>
                            <td><button class='btn-delete' data-user-id='${user.id}'>deletar</button></td>
                        </tr>
                    `;
            tableBody.innerHTML += rowTable;
        });

        const deleteButtons = document.querySelectorAll(".btn-delete");
        const editButtons = document.querySelectorAll(".btn-edit");
        const input = document.querySelectorAll(".input-user");
        const radios = document.querySelectorAll('input[name="funcao"]');
        const submit = document.getElementById("btn-submit");

        deleteButtons.forEach((button) => {
          button.addEventListener("click", async function (event) {
            const userId = event.target.dataset.userId;

            if (
              confirm(
                `Tem certeza que deseja deletar o usuário do ID '${userId}'?`
              )
            ) {
              await deleteUser(userId);
              window.location.reload();
            }
          });
        });

        editButtons.forEach((button) => {
          button.addEventListener("click", async function (event) {
            const userData = event.target.dataset;
            const cancelButton = document.createElement("button");
              const description = document.getElementById("description")

            description.textContent = "Editar Usuário"

            cancelButton.textContent = "Cancelar";
            cancelButton.type = "button";
            cancelButton.id = "cancel-button"
            cancelButton.onclick = () => {
              window.location.reload();
            };

            if (form.querySelector("#cancel-button") === null) form.appendChild(cancelButton);

            form.dataset.editingId = userData.id;

            input[0].value = userData.name;
            input[1].value = userData.email;
            input[2].value = userData.password;
            input[3].value = userData.phone;
            input[4].value = userData.birthDate
            
            radios.forEach((radio) => {
                radio.checked = radio.value === userData.typeuser
            })

            submit.textContent = "Atualizar usuário";
          });
        });
      } else {
        console.log("Nenhum usuário foi adicionado ainda.");
      }
    });
  } else {
    alert("Você não está logado. Redirecionando...");
    window.location.href = "/login";
  }
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  if (form.dataset.editingId) {
    await updateUser(form.dataset.editingId, data);
  } else {
    await adminCreateUser(data);
  }

  window.location.reload()
});

buttonLogout.addEventListener("click", function () {
  logout();
});
