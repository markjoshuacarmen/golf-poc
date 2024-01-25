import express, { Request, Response } from 'express';
import mysql, { MysqlError, OkPacket } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'golfschema',
});

app.get('/', (req: Request, res: Response) => {
  return res.json('from backend side');
});

app.post('/login', (req: Request, res: Response) => {
  const { login_id, password } = req.body;

  const loginSql = 'SELECT * FROM users WHERE login_id = ? AND password = ?';
  db.query(loginSql, [login_id, password], (err: MysqlError | null, result: any[]) => {
    if (err) {
      return res.json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ message: 'Login successful', user: result[0] });
  });
});

app.get('/courses', (req: Request, res: Response) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err: MysqlError | null, data: any[]) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 0) {
      return res.json({ message: 'No data found' });
    }

    return res.json(data);
  });
});

app.post('/createCourse', (req: Request, res: Response) => {
  const { course_name, rating, slope, is_active } = req.body;

  const insertCourseSql = `
    INSERT INTO courses 
    (course_name, rating, slope, is_active, created_time, update_time) 
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
  `;

  db.query(
    insertCourseSql,
    [course_name, rating, slope, is_active],
    (err: MysqlError | null, result: OkPacket) => {
      if (err) {
        console.error('Error inserting course:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      return res.json({ message: 'Course added successfully', courseId: result.insertId });
    }
  );
});

const port = 8081;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
