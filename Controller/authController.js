const { v4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const { readFile, writeFile } = require("../fileManager/file");
const jsonWebToken = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const { name, lastName, password } = req.body;
    const data = readFile("authBase.json");
    data.push({
      id: v4(),
      password: await bcryptjs.hash(password, 8),
      name,
      lastName,
    });
    writeFile("authBase.json", data);
    return res.status(200).json({ message: "succesfull register", data });
  } catch (error) {
    return res.status(500).json({ message: "addUser error" });
  }
};
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(404)
        .json({ message: "name or password dont correct!" });
    }
    const data = readFile("authBase.json");
    const user = data.find((item) => item.name === name);
    if (!user) {
      return res.status(404).json({ message: "users not found!" });
    }
    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      return res.status(404).json({ message: "password error" });
    }
    
    const payload = { id: user.id, name: user.name, role: user.role };
    const token = jsonWebToken.sign(payload, "sekret_key", { expiresIn: "1d" });
    res.status(200).json({ message: "tizimga kirish muoffaqiyatli", token });
  } catch (error) {
    return res.status(500).json({ message: "login error" });
  }
};
module.exports = { addUser, login };
