import JWT from "jsonwebtoken";
import dotenv from "dotenv";

const { sign, verify } = JWT;

dotenv.config();
const { TOKEN_SECRET } = process.env;

export const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    TOKEN_SECRET
  );
  return accessToken;
};

export const validToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).send({ error: "User not authenticated" });
  try {
    const validToken = verify(accessToken, TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (e) {
    return res.status(400).send({ error: e });
  }
};
