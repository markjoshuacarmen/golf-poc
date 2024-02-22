import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getPlayers = (): Promise<any> => {
  const sql = 'SELECT * FROM players';
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

