const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.allUsers);
});

userRouter.post('/', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

module.exports = userRouter;
