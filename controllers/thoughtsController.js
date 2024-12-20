const Thought = require('../models/Thought');
const User = require('../models/user');

//Create a new thought
exports.createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate( //find the user by id and update it
            req.body.userId,
            { $push: { thoughts: thought._id } },  //pushing the thought id to the user's thoughts array
            { new: true }  //return the updated user
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Get all thoughts
exports.getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get a single thought by ID
exports.getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought); //send back the thought to the client
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Update a thought by ID
exports.updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,  //update the thought with the request body
            { new: true }
        )
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        //send back the updated thought to the client
        res.json(thought);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Delete a thought by ID
exports.deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        //remove thought from the user's thoughts array
        await User.findByIdAndUpdate( //find the user by id and update it
            thought.userId,
            { $pull: { thoughts: thought._id } },
            { new: true }
        );
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Add a reaction to a thought
exports.addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Delete a reaction from a thought
exports.deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } }, //remove the reaction by reactionId
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


