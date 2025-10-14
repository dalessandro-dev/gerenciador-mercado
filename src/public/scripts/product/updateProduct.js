import { apiClient } from "./../../api/api.js";
import { auth } from "./../firebase.js"

export async function updateProduct(id, data) {
  try {
    if (data) {
      const response = await apiClient.put(`/products/${id}`, 
      {
        nome: data.nome,
        preco: Number(data.preco),
        quantidade: Number(data.quantidade),
        categoria: data.categoria,
      },
      {
        headers: {
          Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
        }
      })

      console.log(response.data.mensagem)
    } else {
      console.log("Nenhum dado foi enviado.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
