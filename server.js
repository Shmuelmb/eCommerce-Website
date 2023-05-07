import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UsersRoutes from "./routes/UsersRoutes.js";
import ProductsRoutes from "./routes/ProductsRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//dotenv
dotenv.config();
const { PORT, DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env;

//express and cors
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("client/dist"));
app.use("/api/users", UsersRoutes);
app.use("/api/products", ProductsRoutes);

//mongoose
mongoose.set("strictQuery", false);

//build route
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html");
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
