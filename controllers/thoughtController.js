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
    }
    // post to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    // put to update thought by id
    // delete to remove a thought by id

    // /api/thoughts/:thoughtId/reactions
    // post to create a reaction stored in a single thought's `reactions` array field
    // delete to pull and remove a reaction by the reaction's `reactionId` value
}