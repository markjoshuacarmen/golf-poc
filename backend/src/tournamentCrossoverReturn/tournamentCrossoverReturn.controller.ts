import { Request, Response } from 'express';
import { createTournamentCrossoverReturn, getTournamentCrossoverReturn } from './tournamentCrossoverReturn.service';

class TournamentCrossoverReturnController {
    static async getTournamentCrossoverReturn(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentCrossoverReturn();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament CrossoverReturn :', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentCrossoverReturn(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentCrossoverReturnData = req.body;
            
            const result = await createTournamentCrossoverReturn(tournamentCrossoverReturnData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error creating tournament CrossoverReturn :', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentCrossoverReturnController;
