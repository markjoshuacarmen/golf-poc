import express from 'express';
import TournamentMainHoleResultController from './tournamentMainHoleResult.controller';

const router = express.Router();

router.get('/tournamentMainHoleResult', TournamentMainHoleResultController.getTournamentMainHoleResult);
router.post('/createTournamentMainHoleResult', TournamentMainHoleResultController.createTournamentMainHoleResult);

export default router;