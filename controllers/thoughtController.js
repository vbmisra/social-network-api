const { User, Thought } = require('../models')

module.exports = {
    // /api/thoughts
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // get single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)    
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // post to create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought associated with that id' })
                    : User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $push: { thoughts: thought.thoughtId }},
                        { new: true }
                    )
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user associated with this id' })
                    : res.json(user)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // put to update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { thoughtId: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought assoicated with that id' })
                    : res.json(thought)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // delete to remove a thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought assoicated with that id' })
                    : User.findOneAndUpdate(
                        { _id: req.params.username },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            })
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // /api/thoughts/:thoughtId/reactions
    // post to create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }},
            { new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought assoicated with that id' })
                    : res.json(thought)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // delete to pull and remove a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}