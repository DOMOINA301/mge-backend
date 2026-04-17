const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// 📜 Historique d’un étudiant
router.get("/student/:studentId", async (req, res) => {
  try {
    const events = await Event.find({
      student: req.params.studentId
    }).sort({ dateEvent: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
