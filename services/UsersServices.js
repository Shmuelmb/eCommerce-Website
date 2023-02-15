import { Users } from "../models/UsersSchema.js";
import bcrypt from "bcrypt";

export const addUser = (username, password, res) => {
  bcrypt.hash(password, 10).then((hash) => {
    const newUser = new Users({ UserName: username, Password: hash });
    res.status(200).send(`newUser: ${newUser}`);
    return newUser.save();
  });
};
