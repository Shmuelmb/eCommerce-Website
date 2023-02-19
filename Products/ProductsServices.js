import { Products } from "./ProductsSchema.js";

export const getAllProducts = () => {
  return Products.find({});
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
    image: product.image,
    rating: product.rating,
  });
  return newProduct.save();
};
