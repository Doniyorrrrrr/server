const {Router} = require("express")
const authRouter = Router()

const {addUser,login} = require("../Controller/authController")

authRouter.post("/addUser",addUser)
authRouter.post("/login",login) 

module.exports = authRouter