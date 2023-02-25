import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { UserModel } from "../model/UserModel"
import { updatePasswordDTO, User } from "../model/User"
import { updateFollowsDTO } from "../model/Follow"


export class UserDatabase implements UserRepository {
    signup = async (newUser: User): Promise<void> => {
        try {
            await UserModel.create(newUser)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    followUser = async (updateUser: updateFollowsDTO): Promise<void> => {
        try {
            await UserModel.findOneAndUpdate({_id: updateUser.id}, {following: updateUser.following})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    unfollowUser = async (updateUser: updateFollowsDTO): Promise<void> => {
        try {
            await UserModel.findOneAndUpdate({_id: updateUser.id}, {following: updateUser.following})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserById = async (id: string): Promise<any> => {
        try {
            return await UserModel.findOne({_id: id})
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


    deleteAccount = async (userId: string): Promise<void> => {
        try {
            await UserModel.findOneAndDelete({"_id": userId})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    recoverPassword = async (updatePassword: updatePasswordDTO): Promise<void> => {
        try {
            await UserModel.findOneAndUpdate({"_id": updatePassword.id}, {password: updatePassword.password})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}