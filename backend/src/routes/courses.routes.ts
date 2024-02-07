import express from 'express';

import CoursesController from '../courses/courses.controller';
import CourseHandicapController from '../courses/courseHandicap.controller';
import CourseParController from '../courses/CourseParController';

const router = express.Router();

router.get('/', CoursesController.getCourses);
router.post('/createCourse', CoursesController.createCourse);
router.post('/createHandicap', CourseHandicapController.createCourseHandicap)
router.get('/courseHandicap', CourseHandicapController.getCourseHandicaps)
router.get('/coursePars', CourseParController.getCoursePars)
router.post('/createCoursePar', CourseParController.createCoursePar)

export default router; 