const {
  // createNewCart,
  getCart,
  addtoCart,
  // updateQuantityOfCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const verifyUser = require("../Middlewares/authMiddleware");
const router = require("express").Router();


// creating a new cart with the userId
// router.post("/cart",verifyUser ,createNewCart);

// to view the cart
router.get("/cart",verifyUser, getCart);

// add Item to the cart or update its quantity if it is already present
router.post("/cart", addtoCart);

// update the quantity of the cart
// router.put("/cart/:productId", updateQuantityOfCartItem);

// remove item from the cart
router.delete("/cart/:productId", removeFromCart);

module.exports = router;
