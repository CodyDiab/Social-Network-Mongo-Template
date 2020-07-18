const router = require('express').Router();

const{
    getAllThoughts,
    // getAllThoughtsByUser,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

}=require('../controllers/thought-controller')

router
 .route('/')
 .get(getAllThoughts)
 

router
 .route('/:userId')
 .post(addThought);
//  .get(getAllThoughtsByUser);
router
 .route('/:id')
 .put(updateThought)
 .delete(deleteThought)
 .get(getThoughtById);

router
 .route('/:thoughtId/reactions')
 .put(addReaction)
 
router
 .route('/:thoughtId/reactions/:reactionId')
 .put(deleteReaction);

module.exports = router;