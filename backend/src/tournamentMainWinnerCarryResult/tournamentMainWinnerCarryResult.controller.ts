import { Request, Response } from 'express';
import { createTournamentMainWinnerCarryResult, getTournamentMainWinnerCarryResult } from './tournamentMainWinnerCarryResult.service';

class TournamentMainWinnerCarryResultController {
    static async getTournamentMainWinnerCarryResult(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainWinnerCarryResult();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament Main winner carry result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainWinnerCarryResult(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainWinnerCarryResultData = req.body;
            
            const result = await createTournamentMainWinnerCarryResult(tournamentMainWinnerCarryResultData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament Main winner carry result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainWinnerCarryResultController;
