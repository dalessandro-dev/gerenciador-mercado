import express from "express";
import ProductControllers from "./../controllers/ProductControllers.js";
import { verifyToken } from "./../middleware/verifyToken.js";

export default function productRoutes() {
    const router = express.Router();
    const userControllers = new ProductControllers();

    router.get("/health", verifyToken, (req, res) => userControllers.health(req, res));

    router.get("/", verifyToken, (req, res) => userControllers.getProducts(req, res));

    router.get("/:id", verifyToken, (req, res) => userControllers.searchProduct(req, res));

    router.post("/", verifyToken, (req, res) => userControllers.registerProduct(req, res));

    router.put("/:id", verifyToken, (req, res) => userControllers.updateProduct(req, res));

    router.delete("/:id", verifyToken, (req, res) => userControllers.deleteProduct(req, res));

    return router;
}
