const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.allUsers);
});

userRouter.post('/', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

userRouter.get('/:id', userController.getUserById, (req, res) => {
  return res.status(200).json(res.locals.noteById);
});

userRouter.put('/:id', userController.updatePasswordById, (req, res) => {
  return res.status(200).json(res.locals.updatedUser);
});

userRouter.delete('/:id', userController.deleteUserById, (req, res) => {
  return res.status(200).json(res.locals.deletedUser);
});

module.exports = userRouter;
