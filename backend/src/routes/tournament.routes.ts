import express from 'express';
import TournamentsController from '../tournament/tournament.controller';
import TournamentCrossoverKnockoutController from '../tournamentCrossoverKnockout/tournamentCrossoverKnockout.controller';
import TournamentCrossoverParBetterController from '../tournamentCrossoverParBetter/tournamentCrossoverParBetter.controller';
import TournamentCrossoverReturnController from '../tournamentCrossoverReturn/tournamentCrossoverReturn.controller';
const router = express.Router();

router.get('/', TournamentsController.getTournaments);
router.post('/createTournament', TournamentsController.createTournament);
router.get('/tournamentCrossoverKnockout', TournamentCrossoverKnockoutController.getTournamentCrossoverKnockout);
router.post('/createTournamentCrossoverKnockout', TournamentCrossoverKnockoutController.createTournamentCrossoverKnockout);
router.get('/tournamentCrossoverParBetter', TournamentCrossoverParBetterController.getTournamentCrossoverParBetter);
router.post('tournamentCrossParBetter', TournamentCrossoverParBetterController.createTournamentCrossoverParBetter)
export default router;
