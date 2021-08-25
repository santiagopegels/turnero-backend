const { Schema, model } = require('mongoose')

const QueueSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        default: 0,
    },
    ticketsAttended: [{
        number: Number,
        screen: String,
    }],
    users: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
    }]
})

module.exports = model('Queue', QueueSchema)