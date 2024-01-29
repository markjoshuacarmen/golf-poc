import { Request, Response } from 'express';
import CourseService from './courses.service';

class CoursesController {
  static async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const result = await CourseService.createCourse(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  static async getCourses(req: Request, res: Response): Promise<void> {
    try {
      const result = await CourseService.getCourses();
      res.json(result);
    } catch (error) {
      console.error('Error getting courses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default CoursesController;