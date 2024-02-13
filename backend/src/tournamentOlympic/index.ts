import express from 'express';
import TournamentOlympicController from './tournamentOlympic.controller';

const router = express.Router();

router.get('/tournamentOlympic', TournamentOlympicController.getTournamentOlympic);
router.post('/createTournamentOlympic', TournamentOlympicController.createTournamentOlympic);

export default router;