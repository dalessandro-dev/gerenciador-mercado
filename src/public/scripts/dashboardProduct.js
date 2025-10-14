import { createProduct } from "./product/createProduct.js";
import receiveUserData from "./user/authChanged.js";
import logout from "./user/signOut.js";
import { getProduct } from "./product/getProduct.js";
import { deleteProduct } from "./product/deleteProduct.js";
import { updateProduct } from "./product/updateProduct.js";

let span = document.getElementById("user-email");

const form = document.getElementById("product-form");
const buttonLogout = document.getElementById("logout-button");
const tableBody = document.getElementById("table-products-body");

getProduct((data) => {
  if (data) {
    data.forEach((product) => {
      const rowTable = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.nome}</td>
                    <td>${product.preco.toFixed(2).replace(".", ",")}</td>
                    <td>${product.quantidade}</td>
                    <td>${product.categoria}</td>
                    <td><button class='btn-edit'
                        data-id='${product.id}'
                        data-name='${product.nome}'
                        data-price='${product.preco}'
                        data-quantity='${product.quantidade}'
                        data-category='${product.categoria}'>
                    editar</button></td>
                    <td><button class='btn-delete' data-product-id='${
                      product.id
                    }'>deletar</button></td>
                </tr>
            `;
      tableBody.innerHTML += rowTable;
    });

    const deleteButtons = document.querySelectorAll(".btn-delete");
    const editButtons = document.querySelectorAll(".btn-edit");
    const input = document.querySelectorAll(".input-product");
    const submit = document.getElementById("btn-submit");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        const productId = event.target.dataset.productId;

        if (
          confirm(
            `Tem certeza que deseja deletar o produto do ID '${productId}'?`
          )
        ) {
          await deleteProduct(productId);
          window.location.reload();
        }
      });
    });

    editButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        const productData = event.target.dataset;
        const cancelButton = document.createElement("button");
        const description = document.getElementById("description")

        description.textContent = "Editar Produto"

        cancelButton.textContent = "Cancelar";
        cancelButton.id = "cancel-button"
        cancelButton.type = "button";
        cancelButton.onclick = () => {
          window.location.reload();
        };

        if (form.querySelector("#cancel-button") === null) form.appendChild(cancelButton);

        form.dataset.editingId = productData.id;

        input[0].value = productData.name;
        input[1].value = productData.category;
        input[2].value = productData.price;
        input[3].value = productData.quantity;

        submit.textContent = "Atualizar produto";
      });
    });
  } else {
    console.log("Nenhum produto foi adicionado ainda.");
  }
});

receiveUserData(async (data) => {
  if (data) {
    span.textContent = data.email;
    console.log(await data.getIdToken())
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
    await updateProduct(form.dataset.editingId, data);
  } else {
    await createProduct(data);
  }

  window.location.reload()
});

buttonLogout.addEventListener("click", function () {
  logout();
});
