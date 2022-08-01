const { json } = require('express');
const { User, Thought } = require('../models');


const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: ['-username', '-__v']
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: ['-username', '-__v']
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })

                }
                res.json(dbUserData)

            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })

    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                return dbUserData;
            })
            .then(friend => {
                User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: friend } },
                    { new: true, runValidators: true }
                )
                    .select('-__v')
                    .then(dbUserData => {
                        if (!dbUserData) {
                            return res.status(404).json({ message: 'No user found with this id!' })
                        }
                        return dbUserData;
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json(err);
                    })

            })


    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                return dbUserData;
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                Thought.deleteMany({ username: dbUserData.username })
                    .then(dbThoughtData => console.log(dbThoughtData))
                res.json(dbUserData)

            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                res.json(dbUserData)
            }) 
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            }) 
    }
}

module.exports = userController; 
