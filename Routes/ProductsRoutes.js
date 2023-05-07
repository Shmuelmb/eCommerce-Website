import express from "express";

import {
  productsByCategoryController,
  allProductsController,
  getProductController,
  addProductController,
  deleteProductController,
} from "../Products/ProductsContoroller.js";
const router = express.Router();
//get - fetch data from db -- mongo function findOne({condition:condition}) \ find({condition:condition}) or find({})
//post - add an item to the db -- new Model({paramters:parmeters}) --> model.save()
//put - edit an item inside the db --> valid operations --> findOne({condition:condition}) --> model.save()
//delete - delete an item from the db --> findOneAndDelete({condition:condition})

//products route
router.get("/getAllProducts", allProductsController);
router.get("/getProduct/:id", getProductController);
router.post("/addProduct", addProductController);
router.delete("/deleteProduct/:id", deleteProductController);
router.get(
  "/productsByCategoryController/:category",
  productsByCategoryController
);
// router.put("/api/products/updateProduct/:id", async (req, res) => {
//   const { id } = req.params;

//   const updates = Object.keys(req.body);
//   const isValidOperation = updates.every((update) =>
//     productsAllowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     res.status(400).send({ message: "Invalid updates" });
//   }

//   try {
//     const product = await Products.findOne({ id: id });
//     if (!product) {
//       res.status(404).send({ message: "product does not exist" });
//     }
//     updates.forEach((update) => (product[update] = req.body[update]));
//     await product.save();
//     res.status(200).send(product);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ message: e });
//   }
// });

export default router;
