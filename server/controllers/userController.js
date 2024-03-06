const pool = require('../db');

const userController = {};

userController.getAllUsers = async (req, res, next) => {
  try {
    //console.log('entering get all notes mw');
    //console.log(pool);
    const allUsers = await pool.query('SELECT * FROM users');
    console.log(allUsers.rows);
    res.locals.allUsers = allUsers.rows;
    //res.json(allNotes.rows);
    return next();
  } catch (err) {
    return next({
      log: `notesController.getAllUsers: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in notesController.getAllUsers. Check server logs.',
      },
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.createUser',
      status: 400,
      message: { err: 'An error occured' },
    });
  }

  try {
    const newUserQuery = `
    INSERT INTO users (username, password) 
    VALUES ($1, $2) 
    RETURNING id, username;`;

    const newUser = await pool.query(newUserQuery, [username, password]);

    res.locals.newUser = newUser;

    return next();
  } catch (err) {
    return next({
      log: `userController.createUser: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.createUser. Check server logs.',
      },
    });
  }
};

module.exports = userController;
