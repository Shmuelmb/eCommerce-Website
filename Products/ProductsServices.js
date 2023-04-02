import { Products } from "./ProductsSchema.js";

export const getAllProducts = () => {
  return Products.find({});
};

export const getProductsByCategory = (category) => {
  return Products.find({ category: category });
};

export const getProduct = (id) => {
  return Products.findOne({ _id: id });
};

export const addProduct = (product) => {
  const newProduct = new Products({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    url_img: product.url_img,
  });
  return newProduct.save();
};

export const deleteProduct = (id) => {
  return Products.findOneAndDelete({ _id: id });
};
