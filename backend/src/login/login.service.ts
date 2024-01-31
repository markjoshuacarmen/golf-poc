import mysql, { MysqlError } from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'golfschema',
});

export const authenticateUser = (login_id: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const loginSql = 'SELECT * FROM users WHERE login_id = ? AND password = ?';
    db.query(loginSql, [login_id, password], (err: MysqlError | null, result: any[]) => {
      if (err) {
        reject(err);
      }

      resolve(result.length > 0 ? result[0] : null);
    });
  });
};
