import { CustomError } from "../error/CustomError"
import { MissingDescription, MissingRecipeId, MissingTitle, NoRecipeFound } from "../error/recipeErrors"
import { MissingToken, Unauthorized, unauthorizedUserRole, userNotAllowedToDeleteRecipe, userNotAllowedToEditRecipe } from "../error/userErrors"
import { inputCreateRecipeDTO, inputEditRecipeDTO, inputGetRecipeDTO, Recipe, updateRecipeDTO } from "../model/Recipe"
import { USER_ROLE } from "../model/UserModel"
import { Authenticator } from "../services/Authenticator"
import { RecipeRepository } from "./RecipeRepository"
import { UserRepository } from "./UserRepository"


export class RecipeBusiness {
    constructor (private recipeDatabase: RecipeRepository, private userDatabase: UserRepository) {}

    createRecipe = async (input: inputCreateRecipeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            if (!input.title) {
                throw new MissingTitle()
            }

            if (!input.description) {
                throw new MissingDescription()
            }

            const authenticator = new Authenticator()
            const tokenIsValid = await authenticator.getTokenData(input.token)

            if (!tokenIsValid) {
                throw new Unauthorized()
            }

            const createdAt = new Date(new Date().toISOString().split("/").reverse().join(","))
            const newRecipe = new Recipe(input.title, input.description, createdAt, tokenIsValid.id)
            
            await this.recipeDatabase.createRecipe(newRecipe)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getRecipes = async (token: string): Promise<Recipe[]> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const tokenIsValid = await authenticator.getTokenData(token)

            if (!tokenIsValid) {
                throw new Unauthorized()
            }
            
            const followingUsers = await this.userDatabase.getFollowingUsers(tokenIsValid.id)
    
            const result: Recipe[] = []
            for (let item of followingUsers) {
                const recipe = await this.recipeDatabase.getRecipes(item.fk_user_id)
                result.push(...recipe)
            }

            if (result.length === 0) {
                throw new NoRecipeFound()
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getRecipeById = async (input: inputGetRecipeDTO): Promise<Recipe> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.id) {
                throw new MissingRecipeId()
            }

            const authenticator = new Authenticator()
            const tokenIsValid = await authenticator.getTokenData(input.token)

            if (!tokenIsValid) {
                throw new Unauthorized()
            }
            
            const result = await this.recipeDatabase.getRecipeById(input.id)
            if (!result) {
                throw new NoRecipeFound()
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editRecipe = async (input: inputEditRecipeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.id) {
                throw new MissingRecipeId()
            }

            const recipe = await this.recipeDatabase.getRecipeById(input.id)
            if (!recipe) {
                throw new NoRecipeFound()
            }

            const authenticator = new Authenticator()
            const tokenIsValid = await authenticator.getTokenData(input.token)

            if (!tokenIsValid) {
                throw new Unauthorized()
            }
            
            if (tokenIsValid.role.toUpperCase() !== USER_ROLE.NORMAL) {
                throw new unauthorizedUserRole()
            }

            if (recipe.fk_user_id !== tokenIsValid.id) {
                throw new userNotAllowedToEditRecipe()
            }

            if (!input.title) {
                input.title = recipe.title
            }

            if (!input.description) {
                input.description = recipe.description
            }

            const updateRecipe: updateRecipeDTO = {
                id: input.id,
                title: input.title,
                description: input.description
            }

            await this.recipeDatabase.editRecipe(updateRecipe)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    deleteRecipe = async (input: inputGetRecipeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.id) {
                throw new MissingRecipeId()
            }

            const recipe = await this.recipeDatabase.getRecipeById(input.id)
            if (!recipe) {
                throw new NoRecipeFound()
            }

            const authenticator = new Authenticator()
            const tokenIsValid = await authenticator.getTokenData(input.token)

            if (!tokenIsValid) {
                throw new Unauthorized()
            }

            if (tokenIsValid.role.toUpperCase() === USER_ROLE.NORMAL && recipe.fk_user_id !== tokenIsValid.id) {
                throw new userNotAllowedToDeleteRecipe()
            }

            await this.recipeDatabase.deleteRecipe(input.id)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}