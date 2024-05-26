import { Request, Response } from 'express';
import { usersServices } from './users.services';
import { usersValidationSchema } from './users.validtion';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { users: UsersData } = req.body;
    // const zodData = usersValidationSchema.parse(UsersData);
    const result = await usersServices.createUsersIntoDB(zodData);
    res.status(200).json({
      success: true,
      msg: 'student collection created',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      msg: error.message || 'something wrong zod',
      error: error,
    });
    console.log(error);
  }
};

export const createStudent;
