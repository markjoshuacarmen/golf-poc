import express from 'express';
import TournamentCrossoverKnockoutController from './tournamentCrossoverKnockout.controller';

const router = express.Router();

router.get('/tournamentCrossoverKnockout', TournamentCrossoverKnockoutController.getTournamentCrossoverKnockout);
router.post('/createTournamentCrossoverKnockout', TournamentCrossoverKnockoutController.createTournamentCrossoverKnockout);

export default router;