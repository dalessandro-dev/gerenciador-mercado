import { auth, signInWithEmailAndPassword } from "./../firebase.js";

export default async function authLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Login bem-sucedido:", userCredential.user);
    alert("Login feito com sucesso.");

    window.location.href = `/dashboard/produtos`;
  } catch (error) {
    console.log("Falha no login:", error.message);
    alert(error);
  }
}
