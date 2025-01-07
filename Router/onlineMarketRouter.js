const { Router } = require("express");
const productRouter = Router();

const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../Controller/onlineMarketController");

productRouter.get("/getProduct", getProduct);
productRouter.post("/postProduct", postProduct);
productRouter.put("/putProduct/:id", putProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
module.exports = productRouter;
