const { User, Thought } = require('../models')

module.exports = {
    // /api/users
    // get all users
    getUsers(req, res) {
        User.find()
            .then ((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    // get single user and populated thought & friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // post a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    }
    // update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
    // delete a user by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !course
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : User.deleteMany({ _id: { $in: user.friends }})
            )
            .then(() => res.json({ message: 'User and friends deleted' }))
            .catch((err) => res.status(500).json(err))
    }
    // /api/users/:userId/friends/:friendId
    // post to add a new friend to a user's friend list
    // delete to delete a friend from a user's friend list
}