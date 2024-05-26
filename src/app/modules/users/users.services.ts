import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUsers } from "./users.interfce";
import { Users } from "./users.model";

const createUsersIntoDB = async (studentData: TStudent, password: string) => {
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
  const result = await Users.create(userData);
    // return result;
     // create student 
 if(Object.keys(result).length){
   studentData.id = result.id;
   studentData.users = result._id;

 }

  };
 

  export const usersServices = {
    createUsersIntoDB,
  }