import { Request, Response } from 'express';
import { createCourseHandicap, getCourseHandicaps } from './courseHandicap.service';
class CourseHandicapController {
  static async getCourseHandicaps(req: Request, res: Response): Promise<void> {
    try {
      const data = await getCourseHandicaps();
      res.json(data);
    } catch (error) {
      console.error('Error getting course handicaps:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createCourseHandicap(req: Request, res: Response): Promise<void> {
    try {
      const { course_id } = req.params;
      const handicapData = req.body;

      const result = await createCourseHandicap(handicapData, parseInt(course_id, 10));
      res.json(result);
    } catch (error) {
      console.error('Error creating course handicap:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default CourseHandicapController;