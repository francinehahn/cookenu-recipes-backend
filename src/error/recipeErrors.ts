import { CustomError } from "./CustomError"


export class MissingTitle extends CustomError {
    constructor () {
        super(422, "Provide the title of the recipe.")
    }
}

export class MissingDescription extends CustomError {
    constructor () {
        super(422, "Provide the description of the recipe.")
    }
}

export class MissingRecipeId extends CustomError {
    constructor () {
        super(422, "Provide the recipe id.")
    }
}

export class InvalidRecipeId extends CustomError {
    constructor () {
        super(422, "Invalid recipe id.")
    }
}

export class NoRecipesFound extends CustomError {
    constructor () {
        super(404, "No recipes found.")
    }
}
