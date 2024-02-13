import express from 'express';
import TournamentMainHandicapDistributionController from './tournamentMainHandicapDistribution.controller';

const router = express.Router();

router.get('/tournamentMainHandicapDistribution', TournamentMainHandicapDistributionController.getTournamentMainHandicapDistribution);
router.post('/createTournamentMainHandicapDistribution', TournamentMainHandicapDistributionController.createTournamentMainHandicapDistribution);

export default router;