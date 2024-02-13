import { Request, Response } from 'express';
import { createTournamentMainNetOverUnder, getTournamentMainNetOverUnder } from './tournamentMainNetOverUnder.service';

class TournamentMainNetOverUnderController {
    static async getTournamentMainNetOverUnder(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainNetOverUnder();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament main net over under:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainNetOverUnder(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainNetOverUnderData = req.body;
            
            const result = await createTournamentMainNetOverUnder(tournamentMainNetOverUnderData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament main net over under:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainNetOverUnderController;
