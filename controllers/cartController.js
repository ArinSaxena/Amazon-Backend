const Cart = require("../Models/cartModel");

const createNewCart = async (req, res) => {
  try {
    const { items } = req.body; // Assuming an array of { productId, quantity }
    const userId = req.user.id; // Get the userId from the authenticated user

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    // Create a new cart for the user
    const newCart = new Cart({
      userId,
      items, // The cart items that the user is adding
      updatedAt: Date.now(),
    });

    await newCart.save();
    res.status(201).json(newCart); // Return the created cart
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id; // Assume you're using JWT and storing user ID in req.user

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//  ADD OR UPDATE ITEM IN THE CART
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming the user ID comes from the authentication token
  try {
    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Update the quantity of the existing product
        existingItem.quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateQuantityOfCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.id;
    const { productId } = req.params;

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity
    item.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createNewCart,
  getCart,
  addToCart,
  updateQuantityOfCartItem,
  removeFromCart,
};
