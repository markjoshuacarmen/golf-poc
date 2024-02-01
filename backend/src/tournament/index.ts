import express from 'express';
import TournamentsController from './tournament.controller';

const router = express.Router();

router.post('/createTournament', TournamentsController.createTournament);
router.get('/', TournamentsController.getTournaments);

export default router;