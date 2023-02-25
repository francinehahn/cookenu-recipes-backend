/*import { UserModel } from "../model/UserModel"
import { RecipeRepository } from "../business/RecipeRepository"
import { CustomError } from "../error/CustomError"
import { getUserInfoDTO, User } from "../model/User"


export class RecipeDatabase implements RecipeRepository {

    createRecipe = async (user: getUserInfoDTO): Promise<void> => {
        try {
            await Model.findOneAndUpdate({"_id": user._id}, {recipes: user.recipes})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getRecipeById = async (id: string): Promise<any> => {
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
    }
}*/