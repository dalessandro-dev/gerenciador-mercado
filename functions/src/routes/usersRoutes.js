import express from "express";
import UsersControllers from "./../controllers/UsersControllers.js";

export default function usersRoutes() {
  const router = express.Router();
  const usersControllers = new UsersControllers();

  router.get("/health", (req, res) => {
    usersControllers.health(req, res)
  })

  router.post("/setRole/:id", (req, res) =>
    usersControllers.setRole(req, res)
  );

  return router;
}
