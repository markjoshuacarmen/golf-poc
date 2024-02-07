import express from 'express';
import TournamentCrossoverReturnController from './tournamentCrossoverReturn.controller';

const router = express.Router();

router.get('/tournamentCrossoverReturn', TournamentCrossoverReturnController.getTournamentCrossoverReturn);
router.post('/createTournamentCrossoverReturn', TournamentCrossoverReturnController.createTournamentCrossoverReturn);

export default router;