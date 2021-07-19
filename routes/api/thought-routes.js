const router = require('express').Router();

const { 
    createThought, 
    getAllThoughts, 
    getThoughtById, 
    updateThought, 
    removeThought,
    createReaction,
    removeReaction } = require('../../controllers/thought-controller');

router.route('/:userId').post(createThought);

router.route('/').get(getAllThoughts);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;