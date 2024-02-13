import { Request, Response } from 'express';
import { createTournamentMainFinalHoleResult, getTournamentMainFinalHoleResult } from './tournamentMainFinalHoleResult.service';

class TournamentMainFinalHoleResultController {
    static async getTournamentMainFinalHoleResult(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainFinalHoleResult();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament Main final hole result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainFinalHoleResult(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainFinalHoleResultData = req.body;
            
            const result = await createTournamentMainFinalHoleResult(tournamentMainFinalHoleResultData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament Main final hole result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainFinalHoleResultController;
