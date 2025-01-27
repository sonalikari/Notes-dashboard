const express = require("express");
const { createNote, getNotes, deleteNote } = require("../controllers/notesController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
