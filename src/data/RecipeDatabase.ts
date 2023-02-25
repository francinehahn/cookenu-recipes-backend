import { UserModel } from "../model/UserModel"
import { RecipeRepository } from "../business/RecipeRepository"
import { CustomError } from "../error/CustomError"
import { getUserInfoDTO, User } from "../model/User"
import { RecipeModel } from "../model/RecipeModel"
import { Recipe } from "../model/Recipe"


export class RecipeDatabase implements RecipeRepository {

    createRecipe = async (newRecipe: Recipe): Promise<void> => {
        try {
            await RecipeModel.create(newRecipe)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    /*getRecipeById = async (id: string): Promise<any> => {
        try {
            return await Model.find({"recipes": [{id}]})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editRecipe = async (updateRecipe: updateRecipeDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({title: updateRecipe.title, description: updateRecipe.description})
            .where("id", updateRecipe.id)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    deleteRecipe = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).del().where("id", id)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }*/
}