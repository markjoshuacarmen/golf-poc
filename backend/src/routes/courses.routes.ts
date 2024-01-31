import express from 'express';
import { verifyToken } from '../middleware/jwt.middleware';
import CoursesController from '../courses/courses.controller';

const router = express.Router();

router.get('/', CoursesController.getCourses);
router.post('/createCourse', verifyToken, CoursesController.createCourse);

export default router; 