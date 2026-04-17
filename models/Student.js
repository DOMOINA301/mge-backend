const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true
    },

    prenom: {
      type: String,
      required: true
    },

    sexe: {
      type: String,
      enum: ["Homme", "Femme"]
    },

    universite: String,
    parcours: String,
    classe: String,
    anneeUniversitaire: String,

    telephone: String,
    adresse: String,

    photo: {
      type: String,
      default: null
    },

    typeAide: {
      type: String,
      default: ""
    },

    montantDroit: {
      type: Number,
      default: 0
    },

    descriptionAide: {
      type: String,
      default: ""
    },

    statut: { 
      type: String, 
      enum: ["actif", "suspendu"], 
      default: "actif",
      set: v => v.toLowerCase() // ← convertit automatiquement en minuscules
    },
    motifSuspension: {
      type: String,
      default: ""
    },

    dateSuspension: {
      type: Date
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);