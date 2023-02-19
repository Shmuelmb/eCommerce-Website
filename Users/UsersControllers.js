import { addUser, login } from "./UsersServices.js";

export const addUserController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await addUser(username, password);
    res.status(200).send(`newUser: ${newUser}`);
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
      res.status(400).send({ message: "username or password uncorrect" });
    } else {
      res.cookie("access-token", user, {
        maxAge: 60000, //one minute
        httpOnly: true,
      });

      res.status(200).send({ message: "logged in", user: username });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const profileController = async (req, res) => {
  try {
    res.status(200).send({ message: "profile" });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
