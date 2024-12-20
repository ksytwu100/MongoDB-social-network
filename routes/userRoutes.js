const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

const router = express.Router();

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up POST and DELETE at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
//URL: http://localhost:3001/api/users/612d2e434b7e9b001f1c9b1e/friends/612d2e434b7e9b001f1c9b1f
//req.params = { userid: '612d2e434b7e9b001f1c9b1e', friendid: '612d2e434b7e9b001f1c9b1f' }