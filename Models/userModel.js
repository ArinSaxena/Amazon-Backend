// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true, 
//     minlength: [6],
//   },
//   // cartItem:[
//   //   {
//   //     type:mongoose.Schema.Types.ObjectId,
//   //     ref:"Product"
//   //   }
//   // ]
//   cartItem:[
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       quantity: 1,
//     },
//   ]
// });

// module.exports = mongoose.model("users", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6],
  },
  cartItem: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);