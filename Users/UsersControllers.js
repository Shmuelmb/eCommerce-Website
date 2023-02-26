import { register, login } from "./UsersServices.js";
export const registerController = async (req, res) => {
  const { username, password, email, isadmin } = req.body;

  try {
    if (password.length < 8) {
      res.status(500).send({ message: "your password not safe" });
    } else {
      const newUser = await register(username, password, email, isadmin);
      !newUser
        ? res.status(200).send({ register: false })
        : res.status(200).send({ navigate: "/login", register: true });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    if (!user) {
      res.status(400).send({ login: false });
    } else {
      user.login = true;
      user.navigate = "/";
      res.status(200).send(user);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const profileController = async (req, res) => {
  const id = req.headers.authorization;
  try {
    res.status(200).send(req);
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
