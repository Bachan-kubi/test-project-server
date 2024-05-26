import { Schema, model } from "mongoose";
import { TUsers } from "./users.interfce";


const usersSchema = new Schema<TUsers>({
    id: {type: String, required: true},
  password: {type: String, required: true},
  needsPasswordChange: {type: Boolean, required: false},
  role: {type: String, enum: ['student', 'faculty', 'admin']},
  status: {type: String, enum: ['in-progress' , 'block']},
  isDeleted: {type: Boolean, default: false},
},{
    timestamps: true
}
);

export const Users = model<TUsers>("Users", usersSchema);