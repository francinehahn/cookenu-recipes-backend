import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { UserModel } from "../model/UserModel"
import { returnFollowingUsersDTO, updatePasswordDTO, User } from "../model/UserTypes"


export class UserDatabase implements UserRepository {
    signup = async (newUser: User): Promise<void> => {
        try {
            await UserModel.create(newUser)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserByEmail = async (email: string): Promise<any> => {
        try {
            return await UserModel.findOne({email})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserById = async (id: string): Promise<any> => {
        try {
            const result = await UserModel.findOne({"_id": id})
            return result
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    followUser = async (newFollow: User): Promise<void> => {
        try {
            await UserModel.findOneAndUpdate({email: newFollow.getEmail()}, newFollow)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    /*unfollowUser = async (userId: string): Promise<void> => {
        try {
            await BaseDatabase.connection("cookenu_followers").where("fk_user_id", userId).delete()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getFollowingUsers = async (id: string): Promise<returnFollowingUsersDTO[]> => {
        try {
            return await BaseDatabase.connection("cookenu_followers").select("fk_user_id").where("fk_follower_id", id)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    deleteAccount = async (userId: string): Promise<void> => {
        try {
            await BaseDatabase.connection("cookenu_recipes").delete().where("fk_user_id", userId)
            await BaseDatabase.connection("cookenu_followers").delete().where("fk_follower_id", userId)
            await BaseDatabase.connection(this.TABLE_NAME).delete().where("id", userId)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    recoverPassword = async (updatePassword: updatePasswordDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).update("password", updatePassword.password).where("id", updatePassword.id)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }*/
}