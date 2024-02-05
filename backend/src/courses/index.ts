import express from 'express';
import CoursesController from './courses.controller';
import CourseHandicapController from './courseHandicap.controller';

const router = express.Router();

router.get('/', CoursesController.getCourses);
router.post('/createCourse', CoursesController.createCourse);
router.post('/createCourseHandicap', CourseHandicapController.createCourseHandicap);
export default router;