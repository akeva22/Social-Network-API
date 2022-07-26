const router = require('express').Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteFriend,
    deleteUser
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend)
    .post(addFriend)

module.exports = router
