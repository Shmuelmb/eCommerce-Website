import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();
const { sign, verify } = JWT;
dotenv.config();
export const { TOKEN_SECRET, CLIENT_ID } = process.env;

export const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id, email: user.email },
    TOKEN_SECRET
  );
  return accessToken;
};

export const validateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  try {
    const validToken = verify(accessToken, TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    } else if (!validToken) {
      const validToken = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).send({ error: err, success: false });
  }
};
