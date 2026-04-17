const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    situation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Situation",
      default: null
    },

    type: {
      type: String,
      enum: [
        "Inscription",
        "Paiement",
        "Situation",
        "Validation situation",
        "Refus situation",
        "Résolution situation"
      ],
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
