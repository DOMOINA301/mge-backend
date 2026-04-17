const jwt = require("jsonwebtoken");

/**
 * ➜ Middleware d’authentification JWT
 */
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérification présence token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Accès refusé. Token manquant."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET non défini");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attendu : { id, role }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide ou expiré."
    });
  }
};

module.exports = auth;