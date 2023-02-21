import { Follow } from "./Follow"
import { Recipe } from "./Recipe"

export enum USER_ROLE {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor (
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLE,
        private recipes: Recipe[],
        private following: Follow[]
    ) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
        this.recipes = recipes
        this.following = following
    }

    getEmail() {
        return this.email
    }
}

export interface inputSignupDTO {
    name: string,
    email: string,
    password: string,
    role: USER_ROLE
}

export interface inputLoginDTO {
    email: string,
    password: string
}

export interface returnUserInfoDTO {
    id: string,
    name: string,
    email: string
}

export interface inputFollowUserDTO {
    userId: string,
    token: string
}

export interface inputGetUserByIdDTO {
    userId: string,
    token: string
}

export interface inputDeleteAccountDTO {
    userId: string,
    token: string
}

export interface returnFollowingUsersDTO {
    fk_user_id: string
}

export interface updatePasswordDTO {
    id: string,
    password: string
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