const {
  createNewCart,
  getCart,
  addToCart,
  updateQuantityOfCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// creating a new cart with the userId
app.post("/cart", createNewCart);

// to view the cart
app.get("/cart", getCart);

// add Item to the cart or update its quantity if it is already present
app.post("/cart", addToCart);

// update the quantity of the cart
app.put("/cart/:productId", updateQuantityOfCartItem);

// remove item from the cart
app.delete("/cart/:productId", removeFromCart);
