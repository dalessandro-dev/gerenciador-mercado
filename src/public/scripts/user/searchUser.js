import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js";

export async function searchUser(id, callback) {
  try {
    const response = await apiClient.get(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })

    console.log(response.data);

    callback(response.data.usuario); 
  } catch (error) {
    console.log(`Ocorreu um erro ao selecionar o usuário: ${error}`)
    callback(null); 
  }
}
