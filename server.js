//imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { productsAllowedUpdates } from "./data/data.js";
import dotenv from "dotenv";
import {
  allProductsController,
  getProductController,
  addProductController,
} from "./Products/ProductsContoroller.js";

import {
  addUserController,
  loginController,
  profileController,
} from "./Users/UsersControllers.js";
import { validToken } from "./Users/JWT.js";
import cookieParser from "cookie-parser";

//dotenv
dotenv.config();
const { PORT, DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env;

//express and cors
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//mongoose
mongoose.set("strictQuery", false);

//schemas

//routes

//get - fetch data from db -- mongo function findOne({condition:condition}) \ find({condition:condition}) or find({})
//post - add an item to the db -- new Model({paramters:parmeters}) --> model.save()
//put - edit an item inside the db --> valid operations --> findOne({condition:condition}) --> model.save()
//delete - delete an item from the db --> findOneAndDelete({condition:condition})

//products route
app.get("/api/products/getAllProducts", allProductsController);

app.get("/api/products/getProduct/:id", getProductController);

app.post("/api/products/addProduct", addProductController);

// app.post("/api/products/addProducts", async (req, res) => {
//   try {
//     const productsList = req.body;
//     const newProducts = await Products.insertMany(productsList);
//     res.status(200).send(newProducts);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ message: e });
//   }
// });

app.put("/api/products/updateProduct/:id", async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    productsAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const product = await Products.findOne({ id: id });
    if (!product) {
      res.status(404).send({ message: "product does not exist" });
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.delete("/api/products/deleteProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.findOneAndDelete({ _id: id });
    // if (!deletedProduct) {
    //   res
    //     .status(404)
    //     .send({ message: "no such product with the specified id" });
    // }
    res.status(200).send(deletedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

//users route
app.post("/api/users/register", addUserController);
app.post("/api/users/login", loginController);
app.get("/api/users/profile", validToken, profileController);

app.get("/profile", (req, res) => {
  res.json("profile");
});

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    app.listen(PORT, () => {
      console.log("info", err);
      console.log("i am listening");
    });
  }
);
//listener at the bottom which concludes the
//listening function to fulfuill all of the requests
