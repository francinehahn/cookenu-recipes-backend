import { Recipe, updateRecipeDTO } from "../model/Recipe"
import { getUserInfoDTO } from "../model/User"


export interface RecipeRepository {
    createRecipe (user: getUserInfoDTO): Promise<void>
    //getRecipeById (id: string): Promise<any>
    //editRecipe (updateRecipe: updateRecipeDTO): Promise<void>
    //deleteRecipe (id: string): Promise<void>
}