const Comment = require("../models/Comment");

exports.getBySituation = async (req, res) => {
  try {
    const comments = await Comment.find({ 
      situation: req.params.situationId 
    })
    .populate("auteur", "nom email role")
    .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      situation: req.body.situation,
      auteur: req.user.id,
      contenu: req.body.contenu
    });
    
    const populatedComment = await Comment.findById(comment._id)
      .populate("auteur", "nom email role");
      
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error("Erreur création commentaire:", err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    
    if (comment.auteur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé" });
    }
    
    await comment.deleteOne();
    res.json({ message: "Commentaire supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};