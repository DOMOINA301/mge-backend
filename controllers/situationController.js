const Situation = require("../models/Situation");

/**
 * ➜ Créer une situation (Étudiant)
 */
exports.createSituation = async (req, res) => {
  try {
    const situation = await Situation.create({
      student: req.body.student,
      typeSituation: req.body.typeSituation,
      description: req.body.description,
      montantDemande: req.body.montantDemande,
      urgence: req.body.urgence
    });

    res.status(201).json(situation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ➜ Toutes les situations d’un étudiant
 */
exports.getByStudent = async (req, res) => {
  try {
    const situations = await Situation.find({
      student: req.params.studentId
    }).sort({ createdAt: -1 });

    res.json(situations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ➜ Voir une situation
 */
exports.getOne = async (req, res) => {
  try {
    const situation = await Situation.findById(req.params.id);
    if (!situation) {
      return res.status(404).json({ message: "Situation non trouvée" });
    }
    res.json(situation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ➜ Décision du RESPONSABLE
 */
exports.updateStatusResponsable = async (req, res) => {
  try {
    const { statut, commentaire } = req.body;

    const situation = await Situation.findByIdAndUpdate(
      req.params.id,
      {
        statut,
        commentaireResponsable: commentaire
      },
      { new: true }
    );

    if (!situation) {
      return res.status(404).json({ message: "Situation non trouvée" });
    }

    res.json(situation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ➜ Décision du SPONSOR
 */
exports.updateStatusSponsor = async (req, res) => {
  try {
    const { statut, commentaire } = req.body;

    const situation = await Situation.findByIdAndUpdate(
      req.params.id,
      {
        statut,
        commentaireSponsor: commentaire
      },
      { new: true }
    );

    if (!situation) {
      return res.status(404).json({ message: "Situation non trouvée" });
    }

    res.json(situation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
