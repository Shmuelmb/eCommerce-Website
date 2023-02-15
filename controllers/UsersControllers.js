import { addUser } from "../services/UsersServices.js";

export const addUserController = (req, res) => {
  const { username, password } = req.body;
  try {
    addUser(username, password, res);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
