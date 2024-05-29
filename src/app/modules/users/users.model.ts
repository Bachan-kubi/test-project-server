import { Schema, model } from "mongoose";
import { TUsers } from "./users.interfce";
import bcrypt from 'bcrypt';
import config from "../../config";

const usersSchema = new Schema<TUsers>({
  id: {type: String},
  password: {type: String, required: true},
  needsPasswordChange: {type: Boolean, required: false},
  role: {type: String, enum: ['student', 'faculty', 'admin']},
  status: {type: String, enum: ['in-progress' , 'block']},
  isDeleted: {type: Boolean, default: false},
},{
    timestamps: true
}
);

// password hashing
usersSchema.pre('save', async function (next) {
  // console.log(this, ' we will save pre hook')
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
usersSchema.post('save', function (doc, next) {
  // console.log(this, ' we saved pre hook')
  console.log(doc);
  // passwors should not be revealed, below process to protect
  doc.password = '';
  next();
});
export const Users = model<TUsers>("User", usersSchema);