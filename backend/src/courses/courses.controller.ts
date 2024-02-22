import { Request, Response } from 'express';
import { getCourses, createCourse, getCourseById } from './courses.service';
import { verifyToken } from '../middleware/jwt.middleware';

class CoursesController {
  static async getCourses(req: Request, res: Response) {
    try {
      const data = await getCourses();
      res.json(data);
    } catch (error) {
      console.error('Error getting courses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const { course_id } = req.body;
      if (!course_id) {
        return res.status(400).json({ error: 'Course ID is required' });
      }

      const course = await getCourseById(course_id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(course);
    } catch (error) {
      console.error('Error getting course by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const { course_name, rating, slope, is_active } = req.body;

      verifyToken(req, res, async () => {
        const decodedToken = (req as any).user;
        const result = await createCourse(
          { course_name, rating, slope, is_active },
          decodedToken.created_by
        );
        res.json(result);
      });
    } catch (error: any) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: error.message }); 
    }
  }
}

export default CoursesController;
