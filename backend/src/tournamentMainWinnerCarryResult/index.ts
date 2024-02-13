import express from 'express';
import TournamentMainWinnerCarryResultController from './tournamentMainWinnerCarryResult.controller';
const router = express.Router();

router.get('/tournamentMainWinnerCarryResult', TournamentMainWinnerCarryResultController.getTournamentMainWinnerCarryResult);
router.post('/createTournamentMainWinnerCarryResult', TournamentMainWinnerCarryResultController.createTournamentMainWinnerCarryResult);

export default router;