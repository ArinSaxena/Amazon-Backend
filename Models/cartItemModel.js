// const mongoose = require("mongoose");
// const product = require("./product");

// const cartItemSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default:1
//       },
//       selected: {
//         type: Boolean,
//         required: true,
//       },
//     },
//   ],
// });

// module.exports = mongoose.model("Cart", cartItemSchema);