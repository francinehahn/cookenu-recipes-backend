import mongoose from "mongoose"

export class Recipe {
    constructor (
        private title: string,
        private description: string,
        private created_at: Date,
        private user: string
    ) {
        this.title = title
        this.description = description
        this.created_at = created_at
        this.user = user
    }
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
