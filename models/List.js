const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    // 🏷 Titre de la liste
    titre: {
      type: String,
      required: true
    },

    // 🎓 Année universitaire
    anneeUniversitaire: {
      type: String,
      required: true
    },

    // 📌 Type de liste
    typeListe: {
      type: String,
      enum: [
        "Étudiants en difficulté",
        "Demande d’aide",
        "Retard de paiement",
        "Bénéficiaires",
        "Autre"
      ],
      required: true
    },

    // 👥 Étudiants concernés
    etudiants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      }
    ],

    // 📸 Photo de la liste signée
    photoListe: {
      type: String,
      default: null
    },

    // 📝 Remarque
    remarque: {
      type: String,
      default: ""
    },

    // 🔄 Statut
    statut: {
      type: String,
      enum: ["En attente", "Validée", "Archivée"],
      default: "En attente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
