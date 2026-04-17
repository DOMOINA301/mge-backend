const express = require("express");
const auth = require("../middleware/auth");
const { 
  getBySituation, 
  createComment,
  deleteComment 
} = require("../controllers/commentController");

const router = express.Router();

router.use(auth);

router.get("/situation/:situationId", getBySituation);
router.post("/", createComment);
router.delete("/:id", deleteComment);

module.exports = router;