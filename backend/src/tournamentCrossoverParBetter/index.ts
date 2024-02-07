import express from 'express';
import TournamentCrossoverParBetterController from './tournamentCrossoverParBetter.controller';

const router = express.Router();

router.get('/tournamentCrossoverParBetter', TournamentCrossoverParBetterController.getTournamentCrossoverParBetter);
router.post('/createTournamentCrossoverParBetter', TournamentCrossoverParBetterController.createTournamentCrossoverParBetter);

export default router;