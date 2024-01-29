import express from 'express';
import CoursesController from './courses.controller';

const router = express.Router();

router.post('/createCourse', CoursesController.createCourse);
router.get('/', CoursesController.getCourses)
export default router;