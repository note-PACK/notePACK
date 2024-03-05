const pool = require('../db');

const notesController = {};

notesController.getAllNotes = async (req, res, next) => {
  try {
    //console.log('entering get all notes mw');
    //console.log(pool);
    const allNotes = await pool.query('SELECT * FROM notes');
    console.log(allNotes.rows);
    res.locals.allNotes = allNotes.rows;
    //res.json(allNotes.rows);
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
  const { title, description, category, user_id } = req.body;
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

notesController.getNoteById = async (req, res, next) => {};

notesController.updateNoteById = async (req, res, next) => {};

notesController.deleteNoteById = async (req, res, next) => {};

module.exports = notesController;
