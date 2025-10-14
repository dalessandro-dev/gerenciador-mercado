import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js";

export async function deleteProduct(id) {
  try {
    const response = await apiClient.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })
    
    console.log(response.data.mensagem);    
  } catch (error) {
    console.log(`Ocorreu um erro ao deletar o produto: ${error.code}`)
  }
}
