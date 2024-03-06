const express = require('express');
const noteRouter = express.Router();
const notesController = require('../controllers/notesController');

noteRouter.get('/', notesController.getAllNotes, (req, res) => {
  return res.status(200).json(res.locals.allNotes);
});

noteRouter.post('/', notesController.createNote, (req, res) => {
  return res.status(201).json(res.locals.newNote);
});

// router.get('/:id', notesController, getNoteById);

// router.put('/:id', notesController.updateNoteById);

// router.delete('/:id', notesController.deleteTaskById);

module.exports = noteRouter;
