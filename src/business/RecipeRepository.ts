import { Recipe, returnRecipesDTO, updateRecipeDTO } from "../model/Recipe"


export interface RecipeRepository {
    createRecipe (newRecipe: Recipe): Promise<void>
    getRecipes (userId: string): Promise<returnRecipesDTO[]>
    getRecipeById (id: string): Promise<any>
    editRecipe (updateRecipe: updateRecipeDTO): Promise<void>
    deleteRecipe (id: string): Promise<void>
}