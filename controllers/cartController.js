const Product = require("../Models/productModel");
const User = require("../Models/userModel");

const addtoCart = async (req, res) => {
  try {
    const { itemId } = req.body; // Assuming { itemId, quantity } in the body
    const userId = req.user.id; // Get the userId from the authenticated user

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product
    const item = await Product.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item is already in the cart
    const existingCartItem = user.cartItem.find(
      (cartItem) => cartItem.productId.toString() === itemId
    );

    if (existingCartItem) {
      // If item exists, increment quantity
      existingCartItem.quantity += 1;
    } else {
      // If item does not exist, add it to the cart
      user.cartItem.push({ productId: itemId, quantity: 1 });
    }

    // Save the user document
    await user.save();

    // Respond with updated cart
    return res.status(200).json({ message: "Item added to cart", cart: user.cartItem });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id; // Assume you're using JWT and storing user ID in req.user

  try {
    // const user = await User.findById(userId).populate("cartItem");
    const user = await User.findById(userId).populate("cartItem.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.cartItem) {
      return res.status(404).json({ message: "Empty Cart!" });
    }
    return res.status(200).json({ cart: user.cartItem });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//  ADD OR UPDATE ITEM IN THE CART
// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id; // Assuming the user ID comes from the authentication token
//   try {
//     // Find the user's cart
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       // Create a new cart if one doesn't exist
//       cart = new Cart({ userId, items: [{ productId, quantity }] });
//     } else {
//       // Check if the product already exists in the cart
//       const existingItem = cart.items.find(
//         (item) => item.productId.toString() === productId
//       );

//       if (existingItem) {
//         // Update the quantity of the existing product
//         existingItem.quantity += quantity;
//       } else {
//         // Add new product to the cart
//         cart.items.push({ productId, quantity });
//       }
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// const updateQuantityOfCartItem = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const userId = req.user.id;
//     const { productId } = req.params;

//     if (quantity <= 0) {
//       return res
//         .status(400)
//         .json({ message: "Quantity must be greater than 0" });
//     }

//     // Find the user's cart
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find the product in the cart
//     const item = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );
//     if (!item) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     // Update the quantity
//     item.quantity = quantity;

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

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
  addtoCart,
  getCart,
  // updateQuantityOfCartItem,
  removeFromCart,
};
