const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createList,
  getAllLists,
  getListById
} = require("../controllers/listController");

// 📸 Upload photo liste signée
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/listes/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ➜ Créer une liste
router.post("/", upload.single("photoListe"), createList);

// ➜ Toutes les listes
router.get("/", getAllLists);

// ➜ Une liste par ID
router.get("/:id", getListById);

module.exports = router;
