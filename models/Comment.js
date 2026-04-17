const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  situation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Situation",
    required: true
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contenu: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);