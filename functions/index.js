import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import * as functions from "firebase-functions/v1";
import express from "express";
import adminUserRoutes from "./src/routes/adminUserRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import UserServices from "./src/services/AdminUserServices.js";
import userRoutes from "./src/routes/usersRoutes.js";

admin.initializeApp();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use("/admin/users", adminUserRoutes());
app.use("/products", productRoutes());
app.use("/users", userRoutes())

export const api = onRequest(app);

export const deleteUser = functions.auth.user().onDelete(async (user) => {
  try {
    const db = admin.firestore();

    await db.collection("usuarios").doc(user.uid).delete();

    console.log(
      `Perfil do Firestore para o UID: ${user.uid} deletado com sucesso.`
    );

    return null;
  } catch (error) {
    console.error(
      `Erro ao deletar perfil do Firestore para o UID: ${user.uid}`,
      error
    );

    throw error;
  }
});

async function createInitialUser() {
  const userTest = new UserServices();
  const mensagem = await userTest.registerUser({
    body: {
      email: "admin@gmail.com",
      nome: "admin",
      senha: "123456",
      isAdmin: true,
      telefone: 123,
      dataDeNascimento: "24/12/2006",
    },
    user: { isAdmin: true },
  });
  console.log(mensagem);
}

createInitialUser();


