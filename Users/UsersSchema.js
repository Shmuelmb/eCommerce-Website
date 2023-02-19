import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

export const Users = mongoose.model("Users", UsersSchema);
