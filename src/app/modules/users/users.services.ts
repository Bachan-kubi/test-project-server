import config from "../../config";
import { NewUser, TUsers } from "./users.interfce";
import { Users } from "./users.model";

const createUsersIntoDB = async (student: TUsers, password: string) => {

  const user: NewUser = {};
    // const users = new Users(student);
    // const result = classStudent.save();
    // customs instance creation 
    // if(await classStudent.isUserExist(student.id)){
    //   throw new Error("user already existed!")
    // }

// if password is not given, use default password
user.password = password || (config.default_password as string);
// if (!password){
//   password = config.default_password as string;
// }else{
//   user.password = password;
// }
  user.role = 'student';
// create users
  const result = await Users.create(user);
    return result;
  };


  export const usersServices = {
    createUsersIntoDB,
  }