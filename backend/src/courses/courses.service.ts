import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getCourses = (): Promise<any> => {
  const sql = 'SELECT * FROM courses';
  console.log('SQL Query:', sql); // Log the SQL query
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

export const getCourseById = (id: number): Promise<any> => {
  const sql = 'SELECT * FROM courses WHERE id = ?';
  console.log('SQL Query:', sql); // Log the SQL query
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err: MysqlError | null, data: any[]) => {
      if (err) {
        reject(err);
      }
      if (data.length === 0) {
        resolve(null); // Resolve null if no course found
      }
      resolve(data[0]); // Resolve the first course found (assuming id is unique)
    });
  });
};
export const createCourse = (
  courseData: any,
  user: any
  
): Promise<{ message: string; courseId?: number }> => {
  console.log('User in createCourse:', user);
  const { course_name, rating, slope, is_active } = courseData;

  const insertCourseSql = `
    INSERT INTO courses 
    (course_name, rating, slope, is_active, created_by, created_time, update_by, update_time) 
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise<{ message: string; courseId?: number }>((resolve, reject) => {
    db.query(
      insertCourseSql,
      [course_name, rating, slope, is_active, user.created_by, user.updated_by],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting course:', err);
          reject({ message: 'Internal Server Error' });
        } else {
          resolve({ message: 'Course added successfully', courseId: result.insertId });
        }
      }
    );
  })
  .catch((error) => {
    console.error('Error in createCourse:', error);
    throw error; 
  });
};