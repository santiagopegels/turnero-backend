const Queue = require('../models/queue')

const createQueue = async (req, res) => {

    const { name } = req.body

    try {

        user = new Queue(req.body)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createQueue
}
