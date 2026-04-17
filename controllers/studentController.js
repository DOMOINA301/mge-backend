const Student = require("../models/Student");
const Event = require("../models/Event");

/**
 * ➜ Créer un étudiant
 */
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      sexe: req.body.sexe,

      universite: req.body.universite,
      parcours: req.body.parcours,
      classe: req.body.classe,
      anneeUniversitaire: req.body.anneeUniversitaire,

      typeAide: req.body.typeAide,
      montantDroit: req.body.montantDroit || 0,
      descriptionAide: req.body.descriptionAide || "",

      telephone: req.body.telephone,
      adresse: req.body.adresse,

      statut: "ACTIF",
      photo: req.file ? `/uploads/${req.file.filename}` : null
    });

    await Event.create({
      student: student._id,
      type: "Inscription",
      description: "Inscription de l’étudiant dans le système"
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * ➜ Lister tous les étudiants
 */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ➜ Voir un étudiant
 */
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * ➜ Modifier un étudiant
 */
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    if (student.statut === "SUSPENDU") {
      return res.status(403).json({
        message: "Étudiant suspendu. Modification interdite."
      });
    }

    Object.assign(student, req.body);
    await student.save();

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * ➜ Modifier la photo
 */
exports.updateStudentPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucune photo envoyée" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    student.photo = `/uploads/${req.file.filename}`;
    await student.save();

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * ➜ Supprimer un étudiant
 */
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.json({ message: "Étudiant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};