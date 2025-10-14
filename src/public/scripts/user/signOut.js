import { signOut, auth } from "./../firebase.js";

export default function logout() {
  signOut(auth)
    .then(() => {
      console.log("Usuário deslogado com sucesso.");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log("Erro ao deslogar o usuário:", error.message);
    });
}
