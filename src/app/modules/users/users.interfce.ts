export type TUsers = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'user' | "faculty" | "admin";
    status: 'in-progress' | 'block';
    isDeleted: boolean;
  };

  export type NewUser = {
    password: string;
    role: string;
  }
  