const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user || !user.status) {
            return res.status(400).json({
                msg: 'User / Password are incorrects - user'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are incorrects - Password'
            })
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

module.exports = {
    login
}