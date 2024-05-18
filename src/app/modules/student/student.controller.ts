import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  // will call  service func
  try {
    const { student: StudentData } = req.body;
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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      msg: 'student collection created',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      msg: 'single students got',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
