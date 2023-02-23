import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { Model } from "../model/Model"
import { getUserInfoDTO, updatePasswordDTO, User } from "../model/User"
import { updateFollowsDTO } from "../model/Follow"


export class UserDatabase implements UserRepository {
    signup = async (newUser: User): Promise<void> => {
        try {
            await Model.create(newUser)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    followUser = async (updateUser: updateFollowsDTO): Promise<void> => {
        try {
            await Model.findOneAndUpdate({_id: updateUser.id}, {following: updateUser.following})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    unfollowUser = async (updateUser: updateFollowsDTO): Promise<void> => {
        try {
            await Model.findOneAndUpdate({_id: updateUser.id}, {following: updateUser.following})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserById = async (id: string): Promise<getUserInfoDTO> => {
        try {
            return await Model.findOne({"_id": id})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserByEmail = async (email: string): Promise<any> => {
        try {
            return await Model.findOne({email})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    deleteAccount = async (userId: string): Promise<void> => {
        try {
            await Model.findOneAndDelete({"_id": userId})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    recoverPassword = async (updatePassword: updatePasswordDTO): Promise<void> => {
        try {
            await Model.findOneAndUpdate({"_id": updatePassword.id}, {password: updatePassword.password})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}