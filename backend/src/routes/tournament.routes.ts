import express from 'express';
import TournamentsController from '../tournament/tournament.controller';
import TournamentCrossoverKnockoutController from '../tournamentCrossoverKnockout/tournamentCrossoverKnockout.controller';
import TournamentCrossoverParBetterController from '../tournamentCrossoverParBetter/tournamentCrossoverParBetter.controller';
import TournamentCrossoverReturnController from '../tournamentCrossoverReturn/tournamentCrossoverReturn.controller';
import TournamentMainFinalHoleResultController from '../tournamentMainFinalHoleResult/tournamentMainFinalHoleResult.controller';
import TournamentMainHandicapDistributionController from '../tournamentMainHandicapDistribution/tournamentMainHandicapDistribution.controller';
import TournamentMainHoleResultController from '../tournamentMainHoleResult/tournamentMainHoleResult.controller';
import TournamentMainNetOverUnderController from '../tournamentMainNetOverUnder/tournamentMainNetOverUnder.controller';
import TournamentMainScoreController from '../tournamentMainScore/tournamentMainScore.controller';
import TournamentMainWinnerCarryResultController from '../tournamentMainWinnerCarryResult/tournamentMainWinnerCarryResult.controller';
import TournamentOlympicController from '../tournamentOlympic/tournamentOlympic.controller';
import playerController from '../player/player.controller'

const router = express.Router();

//tournament
router.get('/', TournamentsController.getTournaments);
router.post('/createTournament', TournamentsController.createTournament);

//tournament crossover knockout
router.get('/tournamentCrossoverKnockout', TournamentCrossoverKnockoutController.getTournamentCrossoverKnockout);
router.post('/createTournamentCrossoverKnockout', TournamentCrossoverKnockoutController.createTournamentCrossoverKnockout);

//tournament crossover par better
router.get('/tournamentCrossoverParBetter', TournamentCrossoverParBetterController.getTournamentCrossoverParBetter);
router.post('/createTournamentCrossoverParBetter', TournamentCrossoverParBetterController.createTournamentCrossoverParBetter)

//tournament crossover return
router.get('/tournamentCrossoverReturn', TournamentCrossoverReturnController.getTournamentCrossoverReturn)
router.post('/createTournamentCrossoverReturn', TournamentCrossoverReturnController.createTournamentCrossoverReturn)

//tournament final hole result
router.get('/tournamentMainFinalHoleResult', TournamentMainFinalHoleResultController.getTournamentMainFinalHoleResult)
router.post('/createTournamentMainFinalHoleResult', TournamentMainFinalHoleResultController.createTournamentMainFinalHoleResult)

//tournament main handicap distribution
router.get('/tournamentMainHandicapDistribution', TournamentMainHandicapDistributionController.getTournamentMainHandicapDistribution);
router.post('/createTournamentMainHandicapDistribution', TournamentMainHandicapDistributionController.createTournamentMainHandicapDistribution);

//tournament main handicap distribution
router.get('/tournamentMainHoleResult', TournamentMainHoleResultController.getTournamentMainHoleResult);
router.post('/createTournamentMainHoleResult', TournamentMainHoleResultController.createTournamentMainHoleResult);

//tournament main net over under
router.get('/tournamentMainNetOverUnder', TournamentMainNetOverUnderController.getTournamentMainNetOverUnder);
router.post('/createTournamentMainNetOverUnder', TournamentMainNetOverUnderController.createTournamentMainNetOverUnder);

//tournament main score
router.get('/tournamentMainScore', TournamentMainScoreController.getTournamentMainScore);
router.post('/createTournamentMainScore', TournamentMainScoreController.createTournamentMainScore);

//tournament main winner carry result
router.get('/tournamentMainWinnerCarryResult', TournamentMainWinnerCarryResultController.getTournamentMainWinnerCarryResult);
router.post('/createTournamentMainWinnerCarryResult', TournamentMainWinnerCarryResultController.createTournamentMainWinnerCarryResult);

//tournament olympic
router.get('/tournamentOlympic', TournamentOlympicController.getTournamentOlympic);
router.post('/createTournamentOlympic', TournamentOlympicController.createTournamentOlympic);

router.get('/player', playerController.getplayers);

export default router;
