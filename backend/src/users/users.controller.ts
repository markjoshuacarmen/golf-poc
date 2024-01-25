import { Request, Response } from 'express';
import { getUserById } from '../users/users.service';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};