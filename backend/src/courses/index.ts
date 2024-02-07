import express from 'express';
import CoursesController from './courses.controller';
import CourseHandicapController from './courseHandicap.controller';
import CourseParController from './CourseParController';

const router = express.Router();

router.get('/', CoursesController.getCourses);
router.post('/createCourse', CoursesController.createCourse);
router.post('/createCourseHandicap', CourseHandicapController.createCourseHandicap);
router.get('/courseHandicap', CourseHandicapController.getCourseHandicaps)
router.get('/coursePar', CourseParController.getCoursePars)
router.post('createCoursePar', CourseParController.createCoursePar)
export default router;