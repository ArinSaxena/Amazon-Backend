const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PRODUCT = require("./Models/productModel");
const productRoutes = require("./Routes/productRoute"); // Adjust the path as needed
const cartRoute = require("./Routes/cartRoute"); // Adjust the path as needed



const cors = require("cors");
const { default: mongoose } = require("mongoose");

// const PORT = process.env.PORT_SERVER || 4001;
const PORT  = 6060
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());


app.use("/api",productRoutes);
app.use("/api",cartRoute );



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});