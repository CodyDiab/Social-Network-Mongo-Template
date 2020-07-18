const {User} = require('../models');

const UserController = {
// /api/users
    //get all users
  getAllUsers(req, res) {
      User.find({})
    .populate({ path: 'thoughts', select: '-__v'})
    .populate({path:'friends', slect:  '-__v'})
      .select( '-__v')
      .sort({_id:-1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
       console.log(err);
       res.status(500).json(err)
       })
  },
  
    //get one user by id
    getUserById({params},res) {
        User.findOne({_id: params.id})
         .populate({ path: 'thoughts', select: '-__v'})
        .populate({path:'friends', slect:  '-__v'})
        .select( '-__v')
        .then(dbUserData => {
            if(!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    
    },

    //post new user
    newUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    //put (update user by id)
    updateUser({params,body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new:true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: ' No User found with this id'});
                return;  
            }
            res,json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },
    
    //delete user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: ' No User found with this id'});
                return;  
            }
            res.json(dbUserData) 
        })
        .catch(err => res.status(400).json(err));
    },

// /api/users/:userId/friends/:friendId

    //post to add friend
    addFriend({params},res) {
        User.findOneAndUpdate(
           {_id: params.userId},
           {$push: {friends: params.friendId}},
           { new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: ' No User found with this id'});
                return;  
            }
            res.json(dbUserData) 
        })
        .catch(err => res.status(400).json(err));
    },
    //delete to remove friend
    deleteFriend({params},res) {
        User.findOneAndUpdate(
           {_id: params.userId},
           {$pull: {friends: params.friendId}},
           { new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: ' No User found with this id'});
                return;  
            }
            res.json(dbUserData) 
        })
        .catch(err => res.status(400).json(err));
    }
}

/// remove users thoughts when deleted? cascade?

module.exports = UserController;