import {
  register,
  login,
  profile,
  deleteUser,
  getAllUsers,
} from "./UsersServices.js";

export const registerController = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (password.length < 8) {
      res.status(500).send({ message: "your password not safe" });
    } else {
      const newUser = await register(username, password, email);
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
  const token = req.headers.authorization;
  try {
    const user = await profile(token);
    res.status(200).send({ massage: user, success: true });
  } catch (e) {
    console.log(e);

    res.status(400).send({ error: e, success: false });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  try {
    if (!deletedUser) {
      res.status(400).send({ message: "no such user with the specified id" });
    } else {
      res.status(200).send({ message: `this user has been deleted: ${id}` });
    }
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const allUsersController = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).send(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const addUserController = async (req, res) => {
  let { username, password, email, isAdmin } = req.body;
  isAdmin = isAdmin === "true" ? true : false;
  console.log(isAdmin);

  try {
    if (password.length < 8) {
      res.status(500).send({ message: "your password not safe" });
    } else {
      const newUser = await register(username, password, email, isAdmin);
      !newUser
        ? res.status(200).send({ register: false })
        : res.status(200).send({ register: true });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
