const express = require("express");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/allowRoles");
const Situation = require("../models/Situation"); // ← AJOUTÉ

const {
  createSituation,
  getByStudent,
  getOne,
  updateStatusResponsable,
  updateStatusSponsor
} = require("../controllers/situationController");

const router = express.Router();

/**
 * ➜ Créer une situation (Étudiant)
 */
router.post("/", auth, allowRoles("ETUDIANT", "RESPONSABLE"), createSituation);

/**
 * ➜ Situations d’un étudiant
 */
router.get("/student/:studentId", auth, getByStudent);

/**
 * ➜ Détail situation
 */
router.get("/:id", auth, getOne);

/**
 * ➜ Mise à jour du statut (route unique)
 */
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { statut } = req.body;
    const userRole = req.user.role;
    const situationId = req.params.id;

    // Vérifier que la situation existe
    const situation = await Situation.findById(situationId);
    if (!situation) {
      return res.status(404).json({ message: "Situation non trouvée" });
    }

    // Vérifier les permissions selon le rôle
    if (userRole === "RESPONSABLE") {
      // Le responsable ne peut que valider/refuser en tant que responsable
      if (statut === "VALIDEE_RESPONSABLE" || statut === "REFUSEE_RESPONSABLE") {
        const updatedSituation = await Situation.findByIdAndUpdate(
          situationId,
          { statut },
          { new: true }
        );
        return res.json(updatedSituation);
      } else {
        return res.status(403).json({ 
          message: "Le responsable ne peut que valider ou refuser en tant que responsable" 
        });
      }
    }
    
    if (userRole === "SPONSOR") {
      // Le sponsor ne peut que valider/refuser en tant que sponsor
      if (statut === "VALIDEE_SPONSOR" || statut === "REFUSEE_SPONSOR") {
        const updatedSituation = await Situation.findByIdAndUpdate(
          situationId,
          { statut },
          { new: true }
        );
        return res.json(updatedSituation);
      } else {
        return res.status(403).json({ 
          message: "Le sponsor ne peut que valider ou refuser en tant que sponsor" 
        });
      }
    }

    return res.status(403).json({ message: "Rôle non autorisé" });
  } catch (err) {
    console.error("Erreur mise à jour statut:", err);
    res.status(400).json({ message: err.message });
  }
});

/**
 * ➜ Validation / refus responsable (gardé pour compatibilité)
 */
router.put(
  "/responsable/:id",
  auth,
  allowRoles("RESPONSABLE"),
  updateStatusResponsable
);

/**
 * ➜ Validation / refus sponsor (gardé pour compatibilité)
 */
router.put(
  "/sponsor/:id",
  auth,
  allowRoles("SPONSOR"),
  updateStatusSponsor
);

module.exports = router;