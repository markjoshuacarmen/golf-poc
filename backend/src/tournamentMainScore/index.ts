import express from 'express';
import TournamentMainScoreController from './tournamentMainScore.controller';

const router = express.Router();

router.get('/tournamentMainScore', TournamentMainScoreController.getTournamentMainScore);
router.post('/createTournamentMainScore', TournamentMainScoreController.createTournamentMainScore);

export default router;