import { apiClient } from "./../../api/api.js";
import { auth } from "./../firebase.js"

export async function updateUser(id, data) {
  try {
    if (data) {
        const isAdmin = data.funcao == "admin" ? true : false

        const response = await apiClient.put(`/admin/users/${id}`,
        {
            nome: data.nome,
            dataDeNascimento: data.dataDeNascimento,
            telefone: data.telefone,
            isAdmin
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
