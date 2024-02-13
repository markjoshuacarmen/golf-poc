import express from 'express';
import TournamentMainFinalHoleResultController from './tournamentMainFinalHoleResult.controller';

const router = express.Router();

router.get('/tournamentMainFinalHoleResult', TournamentMainFinalHoleResultController.getTournamentMainFinalHoleResult);
router.post('/createTournamentMainFinalHoleResult', TournamentMainFinalHoleResultController.createTournamentMainFinalHoleResult);

export default router;