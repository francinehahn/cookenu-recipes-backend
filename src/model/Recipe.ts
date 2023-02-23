export type Recipe = {
    id: string,
    title: string,
    description: string,
    created_at: Date
}

export interface inputCreateRecipeDTO {
    title: string,
    description: string,
    token: string
}

export interface inputGetRecipeDTO {
    id: string,
    token: string
}

export interface inputEditRecipeDTO {
    id: string,
    title: string,
    description: string,
    token: string
}

export interface updateRecipeDTO {
    id: string,
    title: string,
    description: string
}

export interface pushRecipeDTO {
    recipe: Recipe,
    author: string
}
