import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js";

export async function deleteUser(id) {
  try {
    const response = await apiClient.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })
    
    console.log(response.data.mensagem);    
  } catch (error) {
    console.log(`Ocorreu um erro ao deletar o usuário: ${error.code}`)
  }
}
