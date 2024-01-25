import express from 'express';
import { getCoursesController, createCourseController } from '../controllers/courses.controller';
import { authenticationMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/courses', authenticationMiddleware, getCoursesController);
router.post('/createCourse', authenticationMiddleware, createCourseController);

export default router;