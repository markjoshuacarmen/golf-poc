import { Request, Response } from 'express';
import { createTournamentOlympic, getTournamentOlympic } from './tournamentOlympic.service';

class TournamentOlympicController {
    static async getTournamentOlympic(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentOlympic();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament olympic:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentOlympic(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentOlympicData = req.body;
            
            const result = await createTournamentOlympic(tournamentOlympicData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament olympic:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentOlympicController;
