import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    minLength: 20,
    required: true,
  },
  IsAdmin: {
    type: Boolean,
    default: false,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  DateCreated: {
    type: Date,
    default: Date.now(),
  },
});

export const Users = mongoose.model("Users", UsersSchema);
