const List = require("../models/List");
const Event = require("../models/Event");

// ➜ Créer une liste
exports.createList = async (req, res) => {
  try {
    const list = new List({
      titre: req.body.titre,
      anneeUniversitaire: req.body.anneeUniversitaire,
      typeListe: req.body.typeListe,
      etudiants: req.body.etudiants,
      remarque: req.body.remarque || "",
      photoListe: req.file ? req.file.filename : null
    });

    await list.save();

    // 📜 Historique (pour chaque étudiant)
    if (Array.isArray(req.body.etudiants)) {
      for (const studentId of req.body.etudiants) {
        await Event.create({
          student: studentId,
          type: "Situation",
          description: `Ajout dans la liste : ${list.titre}`
        });
      }
    }

    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➜ Toutes les listes
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find()
      .populate("etudiants", "nom prenom universite classe montantDroit")
      .sort({ createdAt: -1 });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➜ Une liste par ID
exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id)
      .populate("etudiants");

    if (!list) {
      return res.status(404).json({ message: "Liste introuvable" });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
