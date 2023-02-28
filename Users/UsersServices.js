import { Users } from "./UsersSchema.js";
import bcrypt from "bcrypt";
import { createTokens } from "./JWT.js";
import { TOKEN_SECRET } from "./JWT.js";
import JWT from "jsonwebtoken";

const { sign, verify } = JWT;

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
