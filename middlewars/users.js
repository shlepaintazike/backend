const users = require("../models/user");
const bcrypt = require('bcryptjs');

const findAllUsers = async(req, _res, next) => {
    console.log('GET /users');
    req.usersArray = await users.find({});
    next();
};

const findUserById = async(req, res, next) => {
    try{
        req.user =await users.findById(req.params.id);
        next();
    } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send({message: 'User not found'})
    }
}

const createUser = async(req, res, next) => {
    try {
        req.user = await users.create(req.body);
        next()
    } catch (err) {
        res.status(400).send(JSON.stringify({message: 'Error creating user'}))
    }
};

const updateUser = async(req, res, next) => {
    try {
        req.user = await users.findByIdAndUpdatereq(req.params.id, req.body);
        next()
    } catch (err) {
        res.status(400).send({message: 'Error updating user'})
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
    } else {
      next();
    }
  };

  const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
    } else {
      next();
    }
  };

const deleteUser = async(req, res, next) => {
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next()
    } catch (err) {
        res.status(400).send({message: 'Error deleting user'})
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
      return req.body.email === user.email;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
    } else {
      next();
    }
  };

const hashPassword =async (req, res, next) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next()
  } catch (error) {
    req.status(400).send({message: 'Ошибка хэширования пароля'})
  }
}

module.exports= {
    findAllUsers, 
    findUserById, 
    createUser, 
    updateUser, 
    checkEmptyNameAndEmailAndPassword, 
    checkEmptyNameAndEmail, 
    deleteUser,
    checkIsUserExists,
    hashPassword
};