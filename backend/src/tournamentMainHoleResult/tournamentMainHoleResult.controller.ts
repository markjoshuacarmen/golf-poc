import { Request, Response } from 'express';
import { createTournamentMainHoleResult, getTournamentMainHoleResult } from './tournamentMainHoleResult.service';

class TournamentMainHoleResultController {
    static async getTournamentMainHoleResult(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainHoleResult();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament main hole result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainHoleResult(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainHoleResultData = req.body;
            
            const result = await createTournamentMainHoleResult(tournamentMainHoleResultData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament Main hole result:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainHoleResultController;
