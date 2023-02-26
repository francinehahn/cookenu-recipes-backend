import { Request, Response } from "express"
import { RecipeBusiness } from "../business/RecipeBusiness"
import { inputCreateRecipeDTO, inputEditRecipeDTO, inputGetRecipeDTO } from "../model/Recipe"


export class RecipeController {
    constructor (private recipeBusiness: RecipeBusiness) {}

    createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputCreateRecipeDTO = {
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string
            }

            await this.recipeBusiness.createRecipe(input)
            res.status(201).send("Success! The recipe has been registered.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getRecipes = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const result = await this.recipeBusiness.getRecipes(token)
            res.status(200).send(result)
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getRecipeById = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputGetRecipeDTO = {
                id: req.params.id,
                token: req.headers.authorization as string
            }

            const result = await this.recipeBusiness.getRecipeById(input)
            res.status(200).send(result)
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    editRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditRecipeDTO = {
                id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string
            }

            await this.recipeBusiness.editRecipe(input)
            res.status(201).send("Success! The recipe has been edited.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    deleteRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputGetRecipeDTO = {
                id: req.params.id,
                token: req.headers.authorization as string
            }

            await this.recipeBusiness.deleteRecipe(input)
            res.status(200).send("Success! The recipe has been deleted.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}