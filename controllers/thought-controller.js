const { Thought, User, Reaction } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // Create a thought
    createThougt({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            console.log(_id);
            return User.findOneAndUpdate(
                {_id: params.userId},
                { $push: {thougts: _id }},
                {new: true}
            );
        })
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No User found' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.status(500).json(err));
    },
    // retrieve thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(404).json(err));
    },
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.thoughId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with id'});
                return;
            }
            res.json(dbThoughtData);

        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // update thoughts
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: ' No thought found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch( err => res.status(500),json(err));
    },
    // delete thoughts

module.exports = thoughtController;