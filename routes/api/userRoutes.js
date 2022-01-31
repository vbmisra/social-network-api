const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend,
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser)

// /api/users/:userId
router.route('/:userId').get(getSingleUser).post(updateUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend)

module.exports = router
