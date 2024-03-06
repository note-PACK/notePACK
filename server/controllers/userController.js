const pool = require('../db');
const bcrypt = require('bcrypt');

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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserQuery = `
    INSERT INTO users (username, password) 
    VALUES ($1, $2) 
    RETURNING id, username;`;

    const newUser = await pool.query(newUserQuery, [username, hashedPassword]);

    res.locals.newUser = newUser.rows[0];

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

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.verifyUser',
      status: 400,
      message: { err: 'Missing username or password.' },
    });
  }

  try {
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const queryResult = await pool.query(userQuery, [username]);

    if (queryResult.rows.length === 0) {
      return next({
        log: 'Incorrect username or password in userController.verifyUser.',
        status: 400,
        message: { err: 'Incorrect username or password.' },
      });
    }

    const user = queryResult.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next({
        log: 'Incorrect username or password in userController.verifyUser.',
        status: 400,
        message: { err: 'Incorrect username of password.' },
      });
    }

    res.locals.user = { id: user.id, username: user.username };

    return next();
  } catch (err) {
    return next({
      log: `userController.verifyUser: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.verifyUser. Check server logs.',
      },
    });
  }
};

module.exports = userController;
