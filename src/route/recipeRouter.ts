/*import express from "express"
import { RecipeBusiness } from "../business/RecipeBusiness"
import { RecipeController } from "../controller/RecipeController"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { UserDatabase } from "../data/UserDatabase"


export const recipeRouter = express.Router()
const recipeDatabase = new RecipeDatabase()
const userDatabase = new UserDatabase()
const recipeBusiness = new RecipeBusiness(recipeDatabase, userDatabase)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.post("/create", (req, res) => recipeController.createRecipe(req, res))
recipeRouter.get("/", (req, res) => recipeController.getRecipes(req, res))
recipeRouter.get("/:id", (req, res) => recipeController.getRecipeById(req, res))
recipeRouter.put("/:id", (req, res) => recipeController.editRecipe(req, res))
recipeRouter.delete("/:id", (req, res) => recipeController.deleteRecipe(req, res))*/