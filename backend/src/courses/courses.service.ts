import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

class CoursesService {
  static async createCourse(courseData: any): Promise<{ message: string; courseId?: number }> {
    const { course_name, rating, slope, is_active } = courseData;

    const insertCourseSql = `
      INSERT INTO courses 
      (course_name, rating, slope, is_active, created_time, update_time) 
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
    `;

    return new Promise((resolve) => {
      db.query(
        insertCourseSql,
        [course_name, rating, slope, is_active],
        (err: MysqlError | null, result: OkPacket) => {
          if (err) {
            console.error('Error inserting course:', err);
            resolve({ message: 'Internal Server Error' });
          } else {
            resolve({ message: 'Course added successfully', courseId: result.insertId });
          }
        }
      );
    });
  }

  static async getCourses(): Promise<any> {
    const sql = 'SELECT * FROM courses';

    return new Promise((resolve) => {
      db.query(sql, (err: MysqlError | null, data: any[]) => {
        if (err) {
          console.error('Error getting courses:', err);
          resolve({ message: 'Internal Server Error' });
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default CoursesService;