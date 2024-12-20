const express = require('express');
const router = express.Router();
const {createThought, getAllThoughts, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction} = require('../controllers/thoughtsController');


router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought); 
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;