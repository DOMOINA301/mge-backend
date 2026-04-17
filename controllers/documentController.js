const Document = require("../models/Document");
const path = require("path");
const fs = require("fs");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    if (!req.body.situation) {
      return res.status(400).json({ message: "Situation manquante" });
    }

    const document = await Document.create({
      situation: req.body.situation,
      fichier: req.file.filename,
      type: req.file.mimetype
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("❌ DOCUMENT ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getDocumentsBySituation = async (req, res) => {
  try {
    const docs = await Document.find({
      situation: req.params.situationId
    }).sort({ createdAt: -1 });

    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: "Document non trouvé" });
    }

    const filePath = path.join(__dirname, "../uploads/documents", document.fichier);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await document.deleteOne();
    res.json({ message: "Document supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};