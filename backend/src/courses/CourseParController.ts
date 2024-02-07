import { Request, Response } from 'express';
import { createCoursePar, getCoursePars } from './coursePar.service';

class CourseParController {
  static async getCoursePars(req: Request, res: Response): Promise<void> {
    try {
      const data = await getCoursePars();
      res.json(data);
    } catch (error) {
      console.error('Error getting course pars:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createCoursePar(req: Request, res: Response): Promise<void> {
    try {
      const { course_id } = req.params;
      const parData = req.body;
  
      const result = await createCoursePar(parData, parseInt(course_id, 10));
      res.json(result);
    } catch (error) {
      console.error('Error creating course par:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
}

export default CourseParController;
