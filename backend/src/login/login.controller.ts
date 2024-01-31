import { Request, Response } from 'express';
import { authenticateUser } from './login.service';
import { generateToken } from '../middleware/jwt.middleware';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { login_id, password } = req.body;

    const user = await authenticateUser(login_id, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ user_id: user.user_id, login_id: user.login_id });

    return res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
