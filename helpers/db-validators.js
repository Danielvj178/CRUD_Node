const Role = require('../models/role')
const User = require('../models/user')

const validRole = async (role = '') => {
    const roleExist = await Role.findOne({ role })

    if (!roleExist) {
        throw new Error(`${role} doesn't exist in DB`)
    }
}

const userExistByEmail = async (email) => {
    const user = await User.findOne({ email })

    if (user) {
        throw new Error(`${email} email is registered rigth now`)
    }
}

const userExistById = async (id) => {
    const user = await User.findById(id)

    if (!user) {
        throw new Error(`This id doesn't exist ${id}`)
    }
}

module.exports = {
    validRole,
    userExistByEmail,
    userExistById
}