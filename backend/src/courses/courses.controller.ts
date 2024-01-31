import { Request, Response } from 'express';
import { getCourses, createCourse } from './courses.service';
import { verifyToken } from '../middleware/jwt.middleware';

class CoursesController {
  static async getCourses(req: Request, res: Response): Promise<void> {
    try {
      const data = await getCourses();
      res.json(data);
    } catch (error) {
      console.error('Error getting courses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { course_name, rating, slope, is_active } = req.body;
      const created_by = (req as any).user.user_id;

      const result = await createCourse({ course_name, rating, slope, is_active }, created_by);
      res.json(result);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default CoursesController;