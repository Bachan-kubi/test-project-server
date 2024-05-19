import { Request, Response } from 'express';
import { studentServices } from './student.services';
import { StudentValidationSchema } from './student.zod.validation';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  // will call  service func
  try {
    // 1. joi validation
    const { student: StudentData } = req.body;
    // zod validaton schema
    const zodData = StudentValidationSchema.parse(StudentData);

    // joi
    // const {error, value}= studentValidationSchema.validate(StudentData);
    // const {error, value}= studentValidationSchema.validate(StudentData);
// if you send studnetdata it will send db without validaton, you have to send value as valid data
    // const result = await studentServices.createStudentIntoDB(value);
    const result = await studentServices.createStudentIntoDB(zodData);
    // console.log({error});
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     msg: 'something wrong joi',
    //     error: error.details,
    //   });
    // }
    //joi

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


// // normal validation below 
// const { student: StudentData } = req.body;
// const result = await studentServices.createStudentIntoDB(StudentData);
// res.status(200).json({
//   success: true,
//   msg: 'student collection created',
//   data: result,
// });
// } catch (error) {
// res.status(500).json({
//   success: false,
//   msg: 'something wrong',
//   error: error,
// });
// console.log(error);
// }
// };

// const getAllStudents = async (req: Request, res: Response) => {
// try {
// const result = await studentServices.getAllStudentsFromDB();
// res.status(200).json({
//   success: true,
//   msg: 'student collection created',
//   data: result,
// });
// } catch (error) {
// console.log(error);
// }
// };

// const getSingleStudents = async (req: Request, res: Response) => {
// try {
// const { studentId } = req.params;
// console.log(studentId);
// const result = await studentServices.getSingleStudentsFromDB(studentId);
// res.status(200).json({
//   success: true,
//   msg: 'single students got',
//   data: result,
// });
// } catch (error) {
// console.log(error);
// }
// };


export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
