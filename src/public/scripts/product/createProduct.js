import { auth } from "./../firebase.js";
import { apiClient } from "./../../api/api.js"

export async function createProduct(data) {
  try {
    const response = await apiClient.post("/products", 
    {
      nome: data.nome,
      preco: Number(data.preco),
      quantidade: Number(data.quantidade),
      categoria: data.categoria,
      criadoEm: new Date(),
    },
    {
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
      }
    })
    
    console.log(response.data.mensagem);
  } catch (error) {
    console.log("Erro ao adicionar um novo item:", error.code);
  }
}
