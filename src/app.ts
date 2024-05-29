import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouters } from './app/modules/student/student.router';
import { usersRouter } from './app/modules/users/users.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRouters);
app.use('/api/v1/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


// global error hanldler 
// app.use(err, req: Request, res: Respon, next: Next)=>{

// }

export default app;
