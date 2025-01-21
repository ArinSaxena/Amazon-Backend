const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PRODUCT = require("./models/product");
const productRoutes = require("./Routes/productRoute"); // Adjust the path as needed


const cors = require("cors");

// const PORT = process.env.PORT_SERVER || 4001;
const PORT  = 6060
require("./config/db");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());


app.use("/api",productRoutes);
// app.use("/api",cartRoute )



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});