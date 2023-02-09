//imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { productsAllowedUpdates } from "./data/data.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT, DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env;
//the initialising of the server itself
const app = express();

// middlewares for the server
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

//schemas

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

// model related to the specific schema
const Products = mongoose.model("Products", ProductsSchema);

//routes

//get - fetch data from db -- mongo function findOne({condition:condition}) \ find({condition:condition}) or find({})
//post - add an item to the db -- new Model({paramters:parmeters}) --> model.save()
//put - edit an item inside the db --> valid operations --> findOne({condition:condition}) --> model.save()
//delete - delete an item from the db --> findOneAndDelete({condition:condition})

//build from path and a function that called controller
// app.get('/api/calculator', async (req,res) => {
//     res.send({message:"the answer of is"})
// })
app.get("/api/products/getAllProducts", async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.status(200).send(allProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("/api/products/getProduct/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Products.findOne({ _id: pid });
    if (!product) {
      res.status(400).send({ message: "no such product" });
    } else {
      console.log(`this id:${pid} is exist`);
      res.status(200).send(product);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/api/products/addProduct", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Products({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    });
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/api/products/addProducts", async (req, res) => {
  try {
    const productsList = req.body;
    const newProducts = await Products.insertMany(productsList);
    res.status(200).send(newProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

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

// mongoose.connect("mongodb://localhost:27017/OnlineShop", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

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
