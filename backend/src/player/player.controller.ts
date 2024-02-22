import { Request, Response } from 'express';
import { getPlayers } from './player.service';

class playersController {
  static async getplayers(req: Request, res: Response): Promise<void> {
    try {
      const data = await getPlayers();
      res.json(data);
    } catch (error) {
      console.error('Error getting players:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default playersController;
