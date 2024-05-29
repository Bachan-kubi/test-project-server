import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUsers } from "./users.interfce";
import { Users } from "./users.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  console.log(studentData, "student-serice");
  let userData: Partial<TUsers> = {};
    // const users = new Users(student);
    // const result = classStudent.save();
    // customs instance creation 
    // if(await classStudent.isUserExist(student.id)){
    //   throw new Error("user already existed!")
    // }

// 01 if password is not given, use default password
userData.password = password || (config.default_password as string);
// if (!password){
//   password = config.default_password as string;
// }else{
//   user.password = password;
// }
//02 set role
userData.role = 'student';
// 03 set id mannually
userData.id = '12345678987';

  
// create users
  const newUser = await Users.create(userData);
     // create student 
 if(Object.keys(newUser).length){
   studentData.id = newUser.id; // embedded id
   studentData.user = newUser._id; // reference id
   const newStudent = await Student.create(studentData);
   return newStudent;
 }
  };
 

  export const usersServices = {
    createStudentIntoDB,
  }