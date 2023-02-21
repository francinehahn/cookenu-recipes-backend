const mongoose = require("mongoose")

export const UserModel = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    role: String,
    recipes: [],
    following: []
})
