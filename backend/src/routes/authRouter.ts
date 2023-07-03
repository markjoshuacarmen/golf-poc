import express from 'express'
const router = express.Router()

import { registerUser, loginUser, updateUser } from '../controllers/authController'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update').patch(updateUser)

export default router;