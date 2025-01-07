const { error } = require("console");
const { readFile, writeFile } = require("../fileManager/file");
const { v4 } = require("uuid");

const getProduct = (req, res) => {
  try {
    const data = readFile("productBase.json");
    return res.status(200).json({ message: "info product", data });
  } catch (error) {
    return res.status(404).json({ message: "not found product" });
  }
};
const postProduct = (req, res) => {
  try {
    const { name, manufacturyDate, exprationDate, firm } = req.body;
    const data = readFile("productBase.json");
    if (!name || !manufacturyDate || !exprationDate || !firm) {
      return res.status(404).json({ message: "the field is not full" });
    }
    data.push({
      id: v4(),
      name,
      manufacturyDate,
      exprationDate,
      firm,
    });
    writeFile("productBase.json", data);
    return res
      .status(200)
      .json({ message: "informations success added", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "post error", error: error.message });
  }
};
const putProduct = (req, res) => {
  try {
    const data = readFile("productBase.json");
    const { id } = req.params;
    const { name, manufacturyDate, exprationDate, firm } = req.body;
    if (!name || !manufacturyDate || !exprationDate || !firm) {
      return res.status(404).json({ message: "the field is not full" });
    }
    const foundedProduct = data.find((item) => item.id === id);
    if (!foundedProduct) {
      return res.status(404).json({ message: "not found" });
    }
    foundedProduct.name = name || data.name;
    foundedProduct.manufacturyDate = manufacturyDate || data.manufacturyDate;
    foundedProduct.exprationDate = exprationDate || data.exprationDate;
    foundedProduct.firm = firm || data.firm;
    writeFile("productBase.json", data);
    return res.status(200).json({ message: "edit success", data });
  } catch (error) {
    return res.status(500).json({ message: "put error", error: error.message });
  }
};
const deleteProduct = (req, res) => {
  try {
    const data = readFile("productBase.json");
    const { id } = req.params;

    if (!id) {
      return res
        .status(200)
        .json({ message: "id not found", error: error.message });
    }
    const foundetData = data.find((item) => item.id === id);
    if (!foundetData) {
      return res.status(404).json({ message: "error", error: error.message });
    }
    data.splice(foundetData, 1);
    writeFile("productBase.json",data)
    return res
      .status(200)
      .json({ message: "delete success", error: error.message });
  } catch (error) {
    return res.status(500).json("server error");
  }
};
module.exports = { getProduct, postProduct, putProduct,deleteProduct };
