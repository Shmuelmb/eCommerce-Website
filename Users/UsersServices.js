import { Users } from "./UsersSchema.js";
import bcrypt from "bcrypt";
import { createTokens } from "./JWT.js";

export const addUser = async (username, password, email, isadmin) => {
  let hash = await bcrypt.hash(password, 10);
  const newUser = new Users({
    UserName: username,
    Password: hash,
    Email: email,
    IsAdmin: isadmin,
  });
  console.log(`add new user: ${newUser.UserName}`);
  return newUser.save();
};

export const login = async (username, password) => {
  const user = await Users.findOne({ UserName: username });
  if (user) {
    const dbPass = user.Password;
    const match = await bcrypt.compare(password, dbPass);
    if (!match) {
      return false;
    } else {
      const accessToken = createTokens(user);
      return accessToken;
    }
  } else {
    return false;
  }
};
