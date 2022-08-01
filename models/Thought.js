const { Schema, model, Types } = require('mongoose')

const dateFormat = require('../utils/dateFormat')

const { User } = require('./User')

const ReactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId

    },

    reactionBody: {
        type: String,
        required: true,
        maxLength: 200,
    },

    username: {
        type: String,
        required: true

    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        },

        _id: false
    }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true

    }, 

    reactions: [ReactionSchema]

}, 
        { 
            toJSON: {
                getters: true,
                virtuals: true,

            }, 

            id: false
        }
)

ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought