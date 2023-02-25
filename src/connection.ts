import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connection = async () => {
    await mongoose.set('strictQuery', true)

    mongoose.connect(
        `mongodb+srv://franhahn:${process.env.DB_PASSWORD}@cluster0.vlsrr1d.mongodb.net/test`,
        {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions
    )
    .then(() => console.log("Conexão com o mongoDB bem sucedida!"))
    .catch(err => console.log(err))
}