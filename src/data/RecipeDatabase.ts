import { RecipeRepository } from "../business/RecipeRepository"
import { CustomError } from "../error/CustomError"
import { RecipeModel } from "../model/RecipeModel"
import { Recipe, updateRecipeDTO } from "../model/Recipe"


export class RecipeDatabase implements RecipeRepository {

    createRecipe = async (newRecipe: Recipe): Promise<void> => {
        try {
            await RecipeModel.create(newRecipe)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getRecipes = async (userId: string): Promise<any> => {
        try {
            return await RecipeModel.find({user: userId})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getRecipeById = async (id: string): Promise<any> => {
        try {
            return await RecipeModel.findOne({_id: id})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editRecipe = async (updateRecipe: updateRecipeDTO): Promise<void> => {
        try {
            await RecipeModel.findOneAndUpdate({_id: updateRecipe.id}, {title: updateRecipe.title, description: updateRecipe.description})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    /*deleteRecipe = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).del().where("id", id)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }*/
}