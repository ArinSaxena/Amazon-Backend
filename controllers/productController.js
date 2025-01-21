const Product = require("../Models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send("Product not found");
      }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server aError");
  }
};

const addMultipleProducts = async (req, res) => {
  try {
    const products = req.body.map((product) => ({
      ...product,
      quantity: product.quantity || 1,
      selected: product.selected || false,
    }));

    const insertedProducts = await Product.insertMany(products);
    res.json(insertedProducts);
  } catch (error) {
    console.error("Error inserting products:", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {getAllProducts, getProductById, addMultipleProducts};
