import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getCourseHandicaps = (): Promise<any> => {
  const sql = 'SELECT * FROM courses_handicap';
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

export const createCourseHandicap = (
  handicapData: any,
  user: any
): Promise<{ message: string; handicapId?: number }> => {
  const {
    course_id,
    hole_1,
    hole_2,
    hole_3,
    hole_4,
    hole_5,
    hole_6,
    hole_7,
    hole_8,
    hole_9,
    hole_10,
    hole_11,
    hole_12,
    hole_13,
    hole_14,
    hole_15,
    hole_16,
    hole_17,
    hole_18,
    is_active,
  } = handicapData;

  const handicapTotal = calculateHandicapTotal(
    hole_1,
    hole_2,
    hole_3,
    hole_4,
    hole_5,
    hole_6,
    hole_7,
    hole_8,
    hole_9,
    hole_10,
    hole_11,
    hole_12,
    hole_13,
    hole_14,
    hole_15,
    hole_16,
    hole_17,
    hole_18
  );

  const insertHandicapSql = `
    INSERT INTO courses_handicap 
    (course_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9, hole_10,
     hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, handicap_total, is_active,
     created_by, created_time, updated_by, updated_time) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise<{ message: string; handicapId?: number }>((resolve, reject) => {
    const checkCourseSql = 'SELECT * FROM courses WHERE id = ?';
    db.query(checkCourseSql, [course_id], (courseErr: MysqlError | null, courseData: any[]) => {
      if (courseErr) {
        console.error('Error checking course existence:', courseErr);
        reject({ message: 'Internal Server Error' });
      } else if (courseData.length === 0) {
        reject({ message: 'Course not found' });
      } else {
        db.query(
          insertHandicapSql,
          [
            course_id,
            hole_1,
            hole_2,
            hole_3,
            hole_4,
            hole_5,
            hole_6,
            hole_7,
            hole_8,
            hole_9,
            hole_10,
            hole_11,
            hole_12,
            hole_13,
            hole_14,
            hole_15,
            hole_16,
            hole_17,
            hole_18,
            handicapTotal,
            is_active,
            user.created_by, 
            user.updated_by, 
          ],
          (err: MysqlError | null, result: OkPacket) => {
            if (err) {
              console.error('Error inserting course handicap:', err);
              reject({ message: 'Internal Server Error' });
            } else {
              resolve({ message: 'Course handicap added successfully', handicapId: result.insertId });
            }
          }
        );
      }
    });
  });
};

const calculateHandicapTotal = (...holes: number[]): number => {
  return holes.reduce((total, hole) => total + hole, 0);
};
