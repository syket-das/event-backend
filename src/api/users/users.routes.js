const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { findUserById, updateUser } = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { id: userId } = req.payload;
    const user = await findUserById(userId);

    if (!user) {
      next(new Error('User not found'));
    }
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/profile/update', isAuthenticated, async (req, res, next) => {
  try {
    const { id: userId } = req.payload;
    const { fullName, phone, address } = req.body;

    const user = await updateUser(userId, { fullName, phone, address });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
