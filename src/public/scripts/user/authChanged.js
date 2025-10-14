import { auth, onAuthStateChanged } from "./../firebase.js";

export default function receiveUserData(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuário logado:", user.email);

      callback(user);
    } else {
      user = callback(null);
    }
  });
}
