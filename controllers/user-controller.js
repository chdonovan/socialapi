const { User, Thought } = require('../models');

const userConroller = {
    // creates a user
    createUser({ body }, res) {
        console.log(body);
        console.log('Made it here!');
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err + dbUserData + 'WHYYYY');
            res.status(404).json(err);
        });
    },
    // retrieve all user
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // UPDATE USER
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(404).json(err));
    },
    // DELETE USER
    deleteUser({ params }, res) {   
        User.findOneAndDelete({ _id: params.userId })
        .then (deletedUser => {
            if(!deletedUser) {
                return res.status(404).json({ message: 'No user found' });
            }
            return Thought.findOneAndDelete(
                { username: params.username },
                { $pull: { thoughts: { username: params.userController } } }, 
                { new: true }
            );
        })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thoughts found' });
            }
            res.json(deletedThought);
        })
        .catch(err => res.status(400).json(err));
    },
    // CREATE A FRIEND that refernces USER
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'ABORT - No user with this ID! '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // UNFRIEND
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userConroller;