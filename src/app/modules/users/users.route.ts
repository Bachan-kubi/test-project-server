// step 1
import express from 'express';
import { usersController } from './users.controllers';
// step -2
const router = express.Router();

//step-3
router.post('/create-student', usersController.createStudent);


export const usersRouter = router;
