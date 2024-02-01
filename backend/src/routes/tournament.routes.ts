import express from 'express';
import TournamentsController from '../tournament/tournament.controller';
import { verifyToken } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', TournamentsController.getTournaments);
router.post('/createTournament', verifyToken, TournamentsController.createTournament);

export default router;
