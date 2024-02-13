import express from 'express';
import TournamentMainNetOverUnderController from './tournamentMainNetOverUnder.controller';

const router = express.Router();

router.get('/tournamentMainNetOverUnder', TournamentMainNetOverUnderController.getTournamentMainNetOverUnder);
router.post('/createTournamentMainNetOverUnder', TournamentMainNetOverUnderController.createTournamentMainNetOverUnder);

export default router;