const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, postUsers, putUsers, patchUsers, deleteUsers } = require('../controllers/user')
const { validRole, userExistByEmail, userExistById } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.get('/', getUsers)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(userExistByEmail),
    check('password', 'Password is required and must mayor 6 characters').isLength({ min: 6 }),
    //check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validRole),
    validateFields
], postUsers)

router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(validRole),
    validateFields
], putUsers)

router.patch('/', patchUsers)

router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], deleteUsers)

module.exports = router