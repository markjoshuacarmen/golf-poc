import express from 'express';
import playersController from './player.controller';

const router = express.Router();

router.get('/player', playersController.getplayers);

export default router;