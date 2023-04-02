import mongoose from "mongoose";

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
  url_img: {
    type: String,
    default: "https://www.salonlfc.com/en/image-not-found/#top_of_page",
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

// model related to the specific schema
export const Products = mongoose.model("Products", ProductsSchema);
