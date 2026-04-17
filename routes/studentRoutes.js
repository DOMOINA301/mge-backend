const express = require("express");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/allowRoles");
const upload = require("../middleware/upload");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentPhoto,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

/**
 * ➜ Inscription étudiant
 * ADMIN / RESPONSABLE
 */
router.post(
  "/",
  auth,
  allowRoles("ADMIN", "RESPONSABLE"),
  upload.single("photo"),
  createStudent
);

/**
 * ➜ Liste étudiants
 */
router.get(
  "/",
  auth,
  allowRoles("ADMIN", "RESPONSABLE"),
  getAllStudents
);

/**
 * ➜ Détail étudiant
 */
router.get("/:id", auth, getStudentById);

/**
 * ➜ Modifier étudiant
 */
router.put(
  "/:id",
  auth,
  allowRoles("RESPONSABLE"),
  updateStudent
);

/**
 * ➜ Modifier photo
 */
router.put(
  "/:id/photo",
  auth,
  allowRoles("RESPONSABLE"),
  upload.single("photo"),
  updateStudentPhoto
);

/**
 * ➜ Supprimer étudiant
 */
router.delete(
  "/:id",
  auth,
  allowRoles("RESPONSABLE"),
  deleteStudent
);

module.exports = router;