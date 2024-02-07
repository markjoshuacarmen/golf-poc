import { Request, Response } from 'express';
import { createTournamentCrossoverKnockout, getTournamentCrossoverKnockout } from './tournamentCrossoverKnockout.service';

class TournamentCrossoverKnockoutController {
    static async getTournamentCrossoverKnockout(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentCrossoverKnockout();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament crossover knockout:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentCrossoverKnockout(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentCrossoverKnockoutData = req.body;
            
            const result = await createTournamentCrossoverKnockout(tournamentCrossoverKnockoutData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error creating tournament crossover knockout:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentCrossoverKnockoutController;
