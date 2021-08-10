const User = require('../models/user');
const bcrypt = require('bcryptjs');

const newUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                status: false,
                message: 'Ya existe un usuario registrado con ese email'
            })
        }

        user = new User(req.body)

        //Encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        res.status(201).json({
            status: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: error
        })
    }
}

module.exports = {
    newUser
}
