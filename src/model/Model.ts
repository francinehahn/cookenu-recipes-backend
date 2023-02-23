const mongoose = require("mongoose")

export const Model = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    role: String,
    recipes: [],
    following: []
})
