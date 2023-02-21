import { CustomError } from "./CustomError"


export class Unauthorized extends CustomError {
    constructor () {
        super(401, "Unauthorized user.")
    }
}

export class MissingUserName extends CustomError {
    constructor () {
        super(422, "Provide the user name.")
    }
}

export class MissingUserId extends CustomError {
    constructor () {
        super(422, "Provide the user id.")
    }
}

export class MissingEmail extends CustomError {
    constructor () {
        super(422, "Provide the email.")
    }
}

export class EmailNotFound extends CustomError {
    constructor () {
        super(404, "Email not found.")
    }
}

export class MissingPassword extends CustomError {
    constructor () {
        super(422, "Provide the password.")
    }
}

export class MissingRole extends CustomError {
    constructor () {
        super(422, "Provide the user role.")
    }
}

export class MissingToken extends CustomError {
    constructor () {
        super(422, "Provide the token.")
    }
}

export class InvalidEmail extends CustomError {
    constructor () {
        super(422, "Invalid email.")
    }
}

export class InvalidUserRole extends CustomError {
    constructor () {
        super(422, "The user role must be NORMAL or ADMIN.")
    }
}

export class InvalidPassword extends CustomError {
    constructor () {
        super(422, "The password must have at least 6 characters.")
    }
}

export class IncorrectPassword extends CustomError {
    constructor () {
        super(422, "Incorrect password.")
    }
}

export class DuplicateEmail extends CustomError {
    constructor () {
        super(409, "Email already in use.")
    }
}

export class UserNotFound extends CustomError {
    constructor () {
        super(404, "User not found.")
    }
}

export class InvalidUserId extends CustomError {
    constructor () {
        super(401, "The user cannot follow his/her own account.")
    }
}

export class DuplicateFollow extends CustomError {
    constructor () {
        super(422, "The user cannot follow the same account twice.")
    }
}

export class NotPossibleToUnfollow extends CustomError {
    constructor () {
        super(422, "The user cannot unfollow an account that he/she is not following.")
    }
}

export class unauthorizedUserRole extends CustomError {
    constructor () {
        super(401, "Only normal users can edit their recipes.")
    }
}

export class userNotAllowedToEditRecipe extends CustomError {
    constructor () {
        super(401, "The user can only edit his/her own recipes.")
    }
}

export class userNotAllowedToDeleteRecipe extends CustomError {
    constructor () {
        super(401, "The user can only delete his/her own recipes.")
    }
}

export class userNotAllowedToDeleteAccount extends CustomError {
    constructor () {
        super(401, "A user can only delete an account if he/she is an ADMIN.")
    }
}

