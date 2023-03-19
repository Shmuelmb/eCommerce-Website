import mongoose from "mongoose";
const Products = mongoose.model("prods", {});

export const getAllProducts = () => {
  return Products.find({});
};
const getProductsByCategory = (category) => {
  return Products.find({ category: category });
};

export const productsByCategoryController = async (req, res) => {
  const { category } = req.params;

  try {
    const allProducts = await getProductsByCategory(category);
    res.status(200).send(allProducts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
