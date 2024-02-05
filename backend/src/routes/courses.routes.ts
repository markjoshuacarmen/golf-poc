import express from 'express';
import { verifyToken } from '../middleware/jwt.middleware';
import CoursesController from '../courses/courses.controller';
import CourseHandicapController from '../courses/courseHandicap.controller';

const router = express.Router();

router.get('/', CoursesController.getCourses);
router.post('/createCourse', verifyToken, CoursesController.createCourse);
router.post('/createHandicap',verifyToken, CourseHandicapController.createCourseHandicap)

export default router; 