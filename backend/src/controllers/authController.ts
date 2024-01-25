import { Request, Response } from 'express';
import { login } from '../services/auth.service';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { login_id, password } = req.body;
    const result = await login(login_id, password);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};