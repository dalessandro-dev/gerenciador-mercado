import authLogin from "./authLogin.js";
import { auth, setDoc, doc, createUserWithEmailAndPassword, db, serverTimestamp } from "./../firebase.js"
import { apiClient } from "./../../api/api.js";

export async function createUser(data) {
  try {
    const { nome, senha, email, dataDeNascimento, telefone } = data  

    const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
    
    await setDoc(doc(db, "usuarios", userCredential.user.uid), {
      nome,
      email,
      dataDeNascimento,
      telefone,
      criadoEm: serverTimestamp()
    },
    { merge: true })

    const response = await apiClient.post(`/users/setRole/${userCredential.user.uid}`)

    console.log(response.data.mensagem);

    authLogin(data.email, data.senha);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar o usuário: " + error)
  }
}
