import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouters } from './app/modules/student/student.router';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
