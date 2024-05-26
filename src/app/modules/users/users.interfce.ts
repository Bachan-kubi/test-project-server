export type TUsers = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | "faculty" | "admin";
    status: 'in-progress' | 'block';
    isDeleted: boolean;
  };

  // reuse TUser
  // export type NewUser = {
  //   password: string;
  //   role: string;
  //   id: string;
  // }
  