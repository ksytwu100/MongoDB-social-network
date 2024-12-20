const User = require('../models/user'); // Import the user model
const Thought = require('../models/Thought'); // Import the thought model
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends'); // populating the thoughts and friends fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends'); // populating the thoughts and friends fields
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);  //sending the user to the client
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});  // finding the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });  // sending message to the client

    res.json(user);  // sending the updated user to the client
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Thought.deleteMany({ username: user.username });  // refer to line 54 user. on line 56 delete the thought with that user name, deleting all thoughts associated with the user
    res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a friend to a user's friend list
exports.addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);  // The main user, finding the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    const friend = await User.findById(req.params.friendId);  // The friend user, finding the friend by I
    if (!friend) return res.status(404).json({ message: 'Friend not found' });
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,  // updating the user by ID
      { $addToSet: { friends: friend._id } },  // adding the friend to the user's friend list
      { new: true }
    );
    res.json(updatedUser);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Remove a friend from a user's friend list
exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);  // The main user, finding the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
     const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,  // updating the user by ID
      { $pull: { friends: req.params.friendId } },  // $pull is a mongoose method that means removing the friend from the user's friend list
      { new: true }  // returning the updated user
    );
    res.json(updatedUser);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
} 


