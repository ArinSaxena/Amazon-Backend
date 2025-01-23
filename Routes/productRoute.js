const express = require("express");
const Product = require("../Models/productModel");
const router = express.Router();

const {
  getAllProducts,
  addMultipleProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/multiple-post/products", addMultipleProducts);

module.exports= router;