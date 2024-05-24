const {
    sendUserCreated,
    sendAllUsers,
    sendUserUpdated,
    sendUserDeleted,
    sendUserById, 
    sendMe} = require('../controllers/users');

const { checkAuth } = require('../middlewars/auth');

const {
    findAllUsers,
    createUser,
    updateUser,
    deleteUser,
    findUserById,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    checkIsUserExists, 
    hashPassword} = require('../middlewars/users');


const usersRouter = require('express').Router();


usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);


usersRouter.post(
    '/users',
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated);

usersRouter.put(
    '/users/:id',
    checkEmptyNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated);

usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);
usersRouter.get('/me', checkAuth, sendMe);

module.exports = usersRouter;