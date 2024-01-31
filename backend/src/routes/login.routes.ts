import express from 'express';
import { loginController } from '../login/login.controller';

const router = express.Router();

router.post('/', loginController);

export default router;