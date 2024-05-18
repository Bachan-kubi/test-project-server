import { Schema, model, connect } from 'mongoose';

export type Gardian = {
  fathersName: string;
  fathersOccopation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccopation: string;
  mothersContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGardia = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  DOB: string;
  email: string;
  contactNo: string;
  emegencyContactNo: string;
  parmanentAddress: string;
  presentAddress: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gardian: Gardian;
  localGardian: LocalGardia;
  profileImg: string;
  isActive: 'active' | 'blocked';
};
