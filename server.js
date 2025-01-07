const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
const authRouter = require("./Router/authRouter");
const productRouter = require("./Router/onlineMarketRouter");
app.use(authRouter);
app.use(productRouter)
app.listen(PORT, () => {
  console.log("server run", PORT);
});
