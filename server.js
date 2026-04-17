const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// MODELS
const User = require("./models/User");
const Comment = require("./models/Comment");
const Document = require("./models/Document"); // ← AJOUTÉ

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
const situationRoutes = require("./routes/situationRoutes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/commentRoutes");
const documentRoutes = require("./routes/documentRoutes"); // ← AJOUTÉ

dotenv.config();

const app = express();

/* ================= MIDDLEWARES ================= */

// CORS pour React (Vite)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// JSON body
app.use(express.json());

// fichiers upload (photos étudiants et documents)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/situations", situationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/documents", documentRoutes); // ← AJOUTÉ

/* ================= ADMIN PAR DÉFAUT ================= */

async function createDefaultAdmin() {
  try {
    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        nom: "Administrateur",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        student: null
      });

      console.log("✅ ADMIN CRÉÉ PAR DÉFAUT");
      console.log("📧 Email : admin@gmail.com");
      console.log("🔑 Mot de passe : admin123");
    } else {
      console.log("ℹ️ Admin déjà existant");
    }
  } catch (error) {
    console.error("❌ Erreur création admin :", error.message);
  }
}

/* ================= CRÉATION DOSSIER UPLOADS ================= */

const fs = require("fs");
const uploadDirs = ["uploads", "uploads/documents"];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Dossier créé: ${dir}`);
  }
});

/* ================= MONGODB ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connecté");

    await createDefaultAdmin();

    app.listen(5000, () => {
      console.log(" Serveur démarré sur le port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB erreur :", err.message);
  });