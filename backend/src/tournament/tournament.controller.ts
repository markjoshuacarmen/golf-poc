import { Request, Response } from 'express';
import { getTournaments, createTournament } from './tournament.service';

class TournamentsController {
  static async getTournaments(req: Request, res: Response): Promise<void> {
    try {
      const data = await getTournaments();
      res.json(data);
    } catch (error) {
      console.error('Error getting tournaments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createTournament(req: Request, res: Response): Promise<void> {
    try {
      const { tournament_date, course_id, course_handicap, derived_handicap_index, hole, corner, round, to_lose, has_crossover, has_olympic, has_system_36, class_a_index, is_active } = req.body;
      const created_by = (req as any).user.user_id;
      const result = await createTournament({
        tournament_date,
        course_id,
        course_handicap,
        derived_handicap_index,
        hole,
        corner,
        round,
        to_lose,
        has_crossover,
        has_olympic,
        has_system_36,
        class_a_index,
        is_active
      }, created_by);

      res.json(result);
    } catch (error) {
      console.error('Error creating tournament:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default TournamentsController;
