const { User, Thought } = require('../models')

module.exports = {
    // /api/users
    // get all users
    getUsers(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .then ((users) => res.json(users))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // get single user and populated thought & friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // post a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
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
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
    // delete a user by id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : User.findOneAndUpdate(
                        { friends: req.params.friendId },
                        { $pull: { friends: req.params.friendId }},
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'User deleted, but no friends found' })
                    : res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // /api/users/:userId/friends/:friendId
    // post to add a new friend to a user's friend list
    addUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // delete to delete a friend from a user's friend list
    deleteUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err)
            })
    },
}