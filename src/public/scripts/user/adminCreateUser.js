import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js"

export async function adminCreateUser(data) {
  try {
    const isAdmin = data.funcao == "admin" ? true : false
    console.log(data, isAdmin)
    const response = await apiClient.post("/admin/users", 
    {
        nome: data.nome,
        senha: data.senha,
        email: data.email,
        dataDeNascimento: data.dataDeNascimento,
        telefone: data.telefone,
        isAdmin
    },
    {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })
    
    console.log(response.data.mensagem);
  } catch (error) {
    console.log("Erro ao criar o usuário:", error.code);
  }
}
