import express from "express";
import AdminUserControllers from "./../controllers/AdminUserControllers.js";
import { verifyToken } from "./../middleware/verifyToken.js";

export default function adminUserRoutes() {
  const router = express.Router();
  const userControllers = new AdminUserControllers();

  router.get("/health", verifyToken, (req, res) =>
    userControllers.health(req, res)
  );

  router.get("/", verifyToken, (req, res) =>
    userControllers.getUsers(req, res)
  );

  router.get("/:id", verifyToken, (req, res) =>
    userControllers.searchUser(req, res)
  );

  router.post("/", verifyToken, (req, res) =>
    userControllers.registerUser(req, res)
  );

  router.put("/:id", verifyToken, (req, res) =>
    userControllers.updateUser(req, res)
  );

  router.delete("/:id", verifyToken, (req, res) =>
    userControllers.deleteUser(req, res)
  );

  return router;
}
