const pool = require('../db');
const bcrypt = require('bcrypt');

const userController = {};

userController.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.locals.allUsers = allUsers.rows;
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
        log: 'Incorrect username or password in userController.verifyUser. #1',
        status: 400,
        message: { err: 'Incorrect username or password.' },
      });
    }

    const user = queryResult.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next({
        log: 'Incorrect username or password in userController.verifyUser. #2',
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

userController.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userQuery = `
      SELECT id, username 
      FROM users 
      WHERE id = $1`;

    const userById = await pool.query(userQuery, [id]);

    if (userById.rows.length === 0) {
      return next({
        log: `userController.getUserById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No user found with that ID.',
        },
      });
    }
    res.locals.userById = userById.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `userController.getUserById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.getUserById. Check server logs.',
      },
    });
  }
};

userController.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const userQuery = `
      SELECT id, username 
      FROM users 
      WHERE username = $1`;

    const userByUsername = await pool.query(userQuery, [username]);

    if (userByUsername.rows.length === 0) {
      return next({
        log: `userController.getUserById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No user found with that ID.',
        },
      });
    }
    res.locals.userByUsername = userByUsername.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `userController.getUserByUsername: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.getUserByUsername. Check server logs.',
      },
    });
  }
};

userController.updatePasswordById = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return next({
      log: `userController.updatePasswordById: ERROR ${err}`,
      status: 400,
      message: {
        err: 'New password is required.',
      },
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatePasswordQuery = `
        UPDATE users 
        SET password = $1
        WHERE id = $2 
        RETURNING id, username;`;

    const updatedPassword = await pool.query(updatePasswordQuery, [
      hashedPassword,
      id,
    ]);

    if (updatedPassword.rows.length === 0) {
      return next({
        log: `userController.updatePasswordById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No user found with that ID.',
        },
      });
    }
    res.locals.updatedPassword = {
      id: updatedPassword.rows[0].id,
      username: updatedPassword.rows[0].username,
    };
    return next();
  } catch (err) {
    return next({
      log: `userController.updatePasswordById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.updatePasswordById. Check server logs.',
      },
    });
  }
};

userController.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUserQuery = `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING id, username;`;

    const deletedUser = await pool.query(deletedUserQuery, [id]);

    if (deletedUser.rows.length === 0) {
      return next({
        log: `userController.deleteUserById: ERROR ${err}`,
        status: 404,
        message: {
          err: 'No user found with that ID.',
        },
      });
    }
    res.locals.deletedUser = deletedUser.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `userController.deleteUserById: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in userController.deleteUserById. Check server logs.',
      },
    });
  }
};

module.exports = userController;
