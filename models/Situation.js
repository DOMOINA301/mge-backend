const mongoose = require("mongoose");

const situationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    typeSituation: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    montantDemande: {
      type: Number,
      default: 0
    },

    urgence: {
      type: Boolean,
      default: false
    },

    statut: {
      type: String,
      enum: [
        "EN_ATTENTE_RESPONSABLE",
        "REFUSEE_RESPONSABLE",
        "VALIDEE_RESPONSABLE",
        "REFUSEE_SPONSOR",
        "VALIDEE_SPONSOR"
      ],
      default: "EN_ATTENTE_RESPONSABLE"
    },

    commentaireResponsable: {
      type: String,
      default: ""
    },

    commentaireSponsor: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Situation", situationSchema);
