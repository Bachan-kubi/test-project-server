import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  // will call  service func
  try {
    const { student: StudentData } = req.body;
    console.log(StudentData);

    const result = await studentServices.createStudentIntoDB(StudentData);
    res.status(200).json({
      success: true,
      msg: 'student collection created',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
};
