import express from 'express'
const router = express.Router()

import { registerUser, loginUser, updateUser } from '../controllers/authController'
import {CatController} from '../cats'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update').patch(updateUser)
router.route('/cat').get(CatController)

export default router;