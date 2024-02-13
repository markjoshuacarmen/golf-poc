import { Request, Response } from 'express';
import { createTournamentMainScore, getTournamentMainScore } from './tournamentMainScore.service';

class TournamentMainScoreController {
    static async getTournamentMainScore(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainScore();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament Main score:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainScore(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainScoreData = req.body;
            
            const result = await createTournamentMainScore(tournamentMainScoreData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament Main score:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainScoreController;
