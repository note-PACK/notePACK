const express = require('express');
const noteRouter = express.Router();
const notesController = require('../controllers/notesController');

noteRouter.get('/', notesController.getAllNotes, (req, res) => {
  return res.status(200).json(res.locals.allNotes);
});

noteRouter.post('/', notesController.createNote, (req, res) => {
  return res.status(201).json(res.locals.newNote);
});

noteRouter.get('/:id', notesController.getNoteById, (req, res) => {
  return res.status(200).json(res.locals.noteById);
});

noteRouter.put('/:id', notesController.updateNoteById, (req, res) => {
  return res.status(200).json(res.locals.updatedNote);
});

// noteRouter.put('/:id', notesController.updateNoteTitleById, (req, res) => {
//   return res.status(200).json(res.locals.updatedNote);
// });

// noteRouter.put(
//   '/:id',
//   notesController.updateNoteDescriptionById,
//   (req, res) => {
//     return res.status(200).json(res.locals.updatedNote);
//   }
// );

// noteRouter.put('/:id', notesController.updateNoteCategoryById, (req, res) => {
//   return res.status(200).json(res.locals.updatedNote);
// });

noteRouter.delete('/:id', notesController.deleteNoteById, (req, res) => {
  return res.status(200).json(res.locals.deletedNote);
});

module.exports = noteRouter;
