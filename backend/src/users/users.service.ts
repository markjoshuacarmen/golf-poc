import db from '../db/connect';

export const getUserById = (userId: number) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};