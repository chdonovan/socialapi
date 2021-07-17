const { User, Thought } = require('../models');

const userConroller = {
    // creates a user
    createUser({ body }, res) {
        console.log(body);
        console.log('WE MADE IT!');
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err + dbUserData + 'WHYYYY');
        });
        
    },
    // retrieve all user
    getAllUsers(req, res ){
        User.find({})
        .populate({
            path:'thoughts',
            selecy: '__v'
        })
        .select('__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch( err => res.status(404).json(err));
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
}



module.exports = userConroller;