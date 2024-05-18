import { Schema, model, connect } from 'mongoose';
import { Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const gardianSchema = {
  fathersName: { type: String, required: true },
  fathersOccopation: { type: String, required: true },
  fathersContactNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccopation: { type: String, required: true },
  mothersContactNo: { type: String, required: true },
};
const localGardianSchema = {
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
};

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['Male', 'Female'],
  DOB: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emegencyContactNo: { type: String },
  parmanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  gardian: gardianSchema,
  localGardian: localGardianSchema,
  profileImg: { type: String, required: true },
  isActive: ['active', 'blocked'],
});

// create model
export const StudentModel = model<Student>('Student', studentSchema);
