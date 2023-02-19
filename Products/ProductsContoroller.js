import { getAllProducts, getProduct, addProduct } from "./ProductsServices.js";

export const allProductsController = async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getProductController = async (req, res) => {
  const { id } = req.params;
  const product = await getProduct(id);
  try {
    if (!product) {
      res.status(400).send({ message: "no such product" });
    } else {
      // console.log(`this id:${id} is exist`);
      res.status(200).send(product);
    }
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const addProductController = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = await addProduct(product);
    res.status(200).send(newProduct);
  } catch (e) {
    const newProduct = await addProduct(product);

    console.log(newProduct);
    res.status(400).send({ error: e });
  }
};
