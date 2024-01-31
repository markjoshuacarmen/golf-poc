import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getCourses = (): Promise<any> => {
  const sql = 'SELECT * FROM courses';
  return new Promise((resolve, reject) => {
    db.query(sql, (err: MysqlError | null, data: any[]) => {
      if (err) {
        reject(err);
      }

      if (data.length === 0) {
        resolve({ message: 'No data found' });
      }

      resolve(data);
    });
  });
};

export const createCourse = (
  courseData: any,
  created_by: number
): Promise<{ message: string; courseId?: number }> => {
  const { course_name, rating, slope, is_active } = courseData;

  const insertCourseSql = `
    INSERT INTO courses 
    (course_name, rating, slope, is_active, created_by, created_time, update_by, update_time) 
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise((resolve, reject) => {
    db.query(
      insertCourseSql,
      [course_name, rating, slope, is_active, created_by, created_by],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting course:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Course added successfully', courseId: result.insertId });
      }
    );
  });
};