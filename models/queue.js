const { Schema, model } = require('mongoose')

const QueueSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    today: {
        type: Date,
        default: Date.now,
    },
    tickets: [{
        number: Number,
        screen: String,
    }],
    lastNumber: {
        type: Number,
    },
    ticketsAttended: [{
        number: Number,
        screen: String,
    }],
    users: [{
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }]
})

module.exports = model('Queue', QueueSchema)