import { Schema, model} from 'mongoose';
import {
  StudentMethod,
  StudentModel,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
import { func } from 'joi';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is must need!'],
    trim: true,
    maxlength: 20,
    minlength: 3,
    // validate: {
    //   validator:function(value: string){
    //     const nameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return nameStr === value;
    //   },
    //   message: '{VALUE} is not capitalize formate!'

    // }
  },
  middleName: {
    type: String,
    required: [true, 'Middle name is must need!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is must need!'],
    trim: true,
    // validate: {
    //   validator: (value: string)=>validator.isAlpha(value),
    //   message: '{VALUE} is not a setup properly!'
    // }
  },
});
const guardianSchema = {
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContactNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContactNo: { type: String, required: true },
};
const localGuardianSchema = {
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
};

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "Users",
    unique: true

  },
  password: {
    type: String,
    required: true,
    maxlength: [20, 'your password less than 20'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not supported!',
      // or
      // message: "The gender field must be one of the following: 'Male', 'Female', or 'Other'",
    },
    required: true,
  },
  DOB: { type: String },
  isMarried: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string)=>validator.isEmail(value),
    // },
  },
  contactNo: { type: String, required: true },
  emegencyContactNo: { type: String },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  // isActive: {
  //   type: String,
  //   enum: ['active', 'blocked'],
  //   default: 'active',
  // },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: {virtuals: true}
});

// middleware
studentSchema.pre('save', async function (next) {
  // console.log(this, ' we will save pre hook')
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  // console.log(this, ' we saved pre hook')
  console.log(doc);
  // passwors should not be revealed, below process to protect
  doc.password = '';
  next();
});
// query middlewaare
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({$match: {isDeleted:{$ne: true}}});
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// middleware

// mongoose virtual
studentSchema.virtual("fullName").get(function(){
  return(
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
});
// mongoose virtual


// custom instance creation
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
// customs instances

// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
