import express, { Request, Response } from 'express';
import mysql, { MysqlError, OkPacket } from 'mysql';
import cors from 'cors';
import courseRoutes from '../src/courses';
import loginRoutes from './routes/login.routes';
import { verifyToken } from './middleware/jwt.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json('from backend side');
});
 
app.use('/login',loginRoutes);


app.use('/courses',verifyToken, courseRoutes);


const port = 8081;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
