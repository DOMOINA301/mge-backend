const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["ETUDIANT", "RESPONSABLE", "SPONSOR", "ADMIN"],
      required: true,
      default: "RESPONSABLE"
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);