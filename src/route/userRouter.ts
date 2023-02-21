import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../data/UserDatabase"


export const userRouter = express.Router()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.get("/account", (req, res) => userController.getAccountInfo(req, res))
//userRouter.get("/:userId", (req, res) => userController.getUserById(req, res))

userRouter.post("/signup", (req, res) => userController.signup(req, res))
userRouter.post("/login", (req, res) => userController.login(req, res))
userRouter.post("/follow/:userId", (req, res) => userController.followUser(req, res))

/*userRouter.delete("/unfollow", (req, res) => userController.unfollowUser(req, res))
userRouter.delete("/:userId", (req, res) => userController.deleteAccount(req, res))

userRouter.put("/recoverPassword", (req, res) => userController.recoverPassword(req, res))*/
