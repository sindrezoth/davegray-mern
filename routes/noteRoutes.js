const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.route('/')
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .put(notesController.updateNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote)

module.exports = router;
