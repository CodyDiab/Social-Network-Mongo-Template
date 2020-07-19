const {Thought, User} = require('../models');

const ThoughtController = {
///api/thoughts
    //get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
   
    //get one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
           if(!dbThoughtData){
            res.status(404).json({message: 'No thought found with this id!'});
            return;
           }
          res.json(dbThoughtData)
       })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    //post new thought
    addThought( {params,body}, res) {
        console.log(body)
        Thought.create(body)
          .then(({_id})=>{
             return User.findOneAndUpdate(
                 {_id: params.userId},
                 {$push: {thoughts:_id}},
                 {new: true}
             );
         })
         .then(dbUserData => {
            if(!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    //put (update thought by id)
    updateThought( { params, body}, res) {
        console.log(body)
        Thought.findByIdAndUpdate({_id: params.id},body, {new:true})
         .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    //delete thought by id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData=> {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No  thought found with this id!' });
                return; 
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
 
///api/thoughts/:thoughtId/reactions

   //post new reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData=> {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No  thought found with this id!' });
                return; 
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
   //delete reaction
   deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions:{reactionId: params.reactionId} }},
        {new: true}
    )
    .then(dbThoughtData=> {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No  thought found with this id!' });
            return; 
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}
}

module.exports = ThoughtController;