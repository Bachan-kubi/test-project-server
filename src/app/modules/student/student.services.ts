import { Types } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  // 1- build in static method
  // const result = await StudentModel.create(student);

  //2- build in static method
  const classStudent = new Student(student);
  // customs instance creation 
  if(await classStudent.isUserExist(student.id)){
    throw new Error("user already existed!")
  }
  const result = classStudent.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
  return result;
};
const isDeleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted: true});
  return result;
};

const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>)=>{
  const result = await Student.findByIdAndUpdate(
    // { _id: new Types.ObjectId(id) },
    {id},
    { $set: updateData },
    {new: true}
  );
  return result;
}

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  isDeleteStudentsFromDB,
  updateStudentFromDB
};
