import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js";

export async function getUser(callback) {
  try {
    const response = await apiClient.get(`/admin/users`, {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })

    console.log(response.data);

    callback(response.data.usuarios); 
  } catch (error) {
    console.log(`Ocorreu um erro ao selecionar os usuário: ${error}`)
  }
}
