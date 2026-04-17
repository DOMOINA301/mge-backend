const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==================== INSCRIPTION ====================
exports.register = async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Cet email est déjà utilisé" 
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      email,
      password: hashedPassword,
      role: role || "RESPONSABLE",
      student: null
    });

    res.status(201).json({
      message: "Inscription réussie",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("❌ Erreur inscription:", error);
    res.status(500).json({ 
      message: "Erreur serveur lors de l'inscription" 
    });
  }
};

// ==================== CONNEXION ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    // Générer token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("❌ Erreur login :", error);
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};