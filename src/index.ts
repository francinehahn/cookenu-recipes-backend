import { app } from "./app"
import { connection } from "./connection"
//import { recipeRouter } from "./route/recipeRouter"
import { userRouter } from "./route/userRouter"

connection()

app.use("/users", userRouter)
//app.use("/recipes", recipeRouter)
