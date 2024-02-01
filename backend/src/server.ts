import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import loginRoutes from './routes/login.routes';
import courseRoutes from './routes/courses.routes'; 
import tournamentRoutes from './routes/tournament.routes'; 
import { verifyToken } from './middleware/jwt.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json('from backend side');
});

app.use('/login', loginRoutes);
app.use('/courses', verifyToken, courseRoutes);
app.use('/tournaments', verifyToken, tournamentRoutes); 
const port = 8081;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
