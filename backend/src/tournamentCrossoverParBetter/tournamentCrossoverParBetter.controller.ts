import { Request, Response } from 'express';
import { createTournamentCrossoverParBetter, getTournamentCrossoverParBetter } from './tournamentCrossoverParBetter.service';

class TournamentCrossoverParBetterController {
    static async getTournamentCrossoverParBetter(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentCrossoverParBetter();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament crossover ParBetter:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentCrossoverParBetter(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentCrossoverParBetterData = req.body;
            
            const result = await createTournamentCrossoverParBetter(tournamentCrossoverParBetterData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error creating tournament crossover Par Better:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentCrossoverParBetterController;
