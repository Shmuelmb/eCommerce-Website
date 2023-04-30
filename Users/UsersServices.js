import { Users } from "./UsersSchema.js";
import bcrypt from "bcrypt";
import { createTokens } from "./JWT.js";
import { TOKEN_SECRET } from "./JWT.js";
import JWT from "jsonwebtoken";

const { verify } = JWT;

export const loginGoogleUser = async (username, password, email, isadmin) => {
  let hash = await bcrypt.hash(password, 10);
  try {
    const findUser = await Users.findOne({ Email: email });
    let user = {};
    if (findUser) {
      //login
      const accessToken = createTokens(findUser);
      user = {
        username: username,
        id: findUser._id,
        accessToken: accessToken,
      };
      return user;
    } else {
      //register
      const newUser = new Users({
        UserName: username,
        Password: hash,
        Email: email,
        IsAdmin: isadmin,
      });
      console.log(`add new user: ${newUser.UserName}`);
      newUser.save();
      const accessToken = createTokens(newUser);
      user = {
        username: username,
        id: newUser._id,
        accessToken: accessToken,
      };
      return user;
    }
  } catch (e) {
    console.log(e);
  }
};

export const register = async (username, password, email, isadmin) => {
  let hash = await bcrypt.hash(password, 10);
  const userNameCheck = await Users.findOne({ UserName: username });
  const emailCheck = await Users.findOne({ Email: email });
  if (!userNameCheck && !emailCheck) {
    const newUser = new Users({
      UserName: username,
      Password: hash,
      Email: email,
      IsAdmin: isadmin,
    });
    console.log(`add new user: ${newUser.UserName}`);
    return newUser.save();
  } else {
    return false;
  }
};

export const login = async (username, password) => {
  const findUser = await Users.findOne({ UserName: username });
  if (findUser) {
    const dbPass = findUser.Password;
    const match = await bcrypt.compare(password, dbPass);
    if (!match) {
      return false;
    } else {
      const accessToken = createTokens(findUser);
      const user = {
        username: username,
        id: findUser._id,
        accessToken: accessToken,
      };
      return user;
    }
  } else {
    return false;
  }
};
export const profile = async (token) => {
  const decoded = verify(token, TOKEN_SECRET);
  if (decoded) {
    const findUser = await Users.findOne({ _id: decoded.id });
    return findUser;
  } else {
    return false;
  }
};

export const admin = async (token) => {
  const decoded = verify(token, TOKEN_SECRET);
  if (decoded) {
    const findUser = await Users.findOne({ _id: decoded.id });
    if (findUser.IsAdmin) {
      return findUser;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const deleteUser = (id) => {
  return Users.findOneAndDelete({ _id: id });
};

export const getAllUsers = () => Users.find({});
