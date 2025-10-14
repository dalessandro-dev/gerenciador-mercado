import admin from "firebase-admin";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token ausente ou inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};