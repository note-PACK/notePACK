const pool = require('../db');

const notesController = {};

notesController.getAllNotes = async (req, res, next) => {
  try {
    const allNotes = await pool.query('SELECT * FROM notes');
    res.locals.allNotes = allNotes.rows;
    return next();
  } catch (err) {
    return next({
      log: `notesController.getAllNotes: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.getAllNotes. Check server logs.',
      },
    });
  }
};

notesController.createNote = async (req, res, next) => {
  const {
    notetitle: title,
    notedescription: description,
    category,
    user_id,
  } = req.body;
  try {
    const newNoteQuery = `
    INSERT INTO notes (notetitle, notedescription, category, user_id) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;`;

    const newNote = await pool.query(newNoteQuery, [
      title,
      description,
      category,
      user_id,
    ]);
    res.locals.newNote = newNote;
    return next();
  } catch (err) {
    return next({
      log: `notesController.createNote: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.createNote. Check server logs.',
      },
    });
  }
};

notesController.getNoteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const noteById = await pool.query('SELECT * FROM notes WHERE id = $1', [
      id,
    ]);

    if (noteById.rows.length === 0) {
      return next({
        log: `notesControllers.getNoteById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No notes found.',
        },
      });
    }

    res.locals.noteById = noteById.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `notesController.getNoteById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.getNoteById. Check server logs.',
      },
    });
  }
};

notesController.updateNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { notetitle: title, notedescription: description, category } = req.body;

  try {
    const updateQuery = `
    UPDATE notes 
    SET notetitle = $1, notedescription = $2, category = $3 
    WHERE id = $4 
    RETURNING *;`;

    const updatedNote = await pool.query(updateQuery, [
      title,
      description,
      category,
      id,
    ]);

    if (updatedNote.rows.length === 0) {
      return next({
        log: `notesController.updateNoteById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No note found with that ID.',
        },
      });
    }
    res.locals.updatedNote = updatedNote.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `notesController.updateNoteById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.updateNodeById. Check server logs.',
      },
    });
  }
};

notesController.deleteNoteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM notes WHERE id = $1 RETURNING *;`;

    const deletedNote = await pool.query(deleteQuery, [id]);

    if (deletedNote.rows.length === 0) {
      return next({
        log: `notesController.deleteNodeById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No note found with that ID.',
        },
      });
    }
    res.locals.deletedNote = deletedNote.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `notesController.deleteNoteById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.deleteNodeById. Check server logs.',
      },
    });
  }
};

module.exports = notesController;
