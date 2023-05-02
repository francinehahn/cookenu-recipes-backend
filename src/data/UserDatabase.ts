import { UserRepository } from "../business/UserRepository"
import { CustomError } from "../error/CustomError"
import { UserModel } from "../model/UserModel"
import { updatePasswordDTO, User } from "../model/User"
import { Follow, updateUnfollowUserDTO } from "../model/Follow"


export class UserDatabase implements UserRepository {
    signup = async (newUser: User): Promise<void> => {
        try {
            await UserModel.create(newUser)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllUsers = async (search: string): Promise<any> => {
        try {
            return await UserModel.find(
                {name: {$regex: `${search || ""}`, $options: "i"}}, {password: 0}
            )
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    followUser = async (id: string, newFollow: Follow): Promise<any> => {
        try {
            return await UserModel.findOneAndUpdate({
                _id: id, "following.id": {$nin: [newFollow.id]}
            }, {
                $push: {following: {...newFollow}}
            })
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    unfollowUser = async (unfollow: updateUnfollowUserDTO): Promise<void> => {
        try {
            await UserModel.findOneAndUpdate({_id: unfollow.id}, {$pull: {following: {id: unfollow.followingId}}})
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