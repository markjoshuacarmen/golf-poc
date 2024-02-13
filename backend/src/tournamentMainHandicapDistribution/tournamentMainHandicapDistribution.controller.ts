import { Request, Response } from 'express';
import { createTournamentMainHandicapDistribution, getTournamentMainHandicapDistribution } from './tournamentMainHandicapDistribution.service';

class TournamentMainHandicapDistributionController {
    static async getTournamentMainHandicapDistribution(req: Request, res: Response): Promise<void> {
        try {
            const data = await getTournamentMainHandicapDistribution();
            res.json(data);
        } catch (error) {
            console.error('Error getting tournament Main handicap distribution:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createTournamentMainHandicapDistribution(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params
            const tournamentMainHandicapDistributionData = req.body;
            
            const result = await createTournamentMainHandicapDistribution(tournamentMainHandicapDistributionData,  parseInt(course_id, 10));
            res.json(result);
        } catch (error) {
            console.error('Error getting tournament Main handicap distribution:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TournamentMainHandicapDistributionController;
