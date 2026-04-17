const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    situation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Situation",
      required: true
    },
    fichier: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "Document"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);