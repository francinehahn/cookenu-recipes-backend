import { updatePasswordDTO, User } from "../model/User"
import { Follow, updateFollowsDTO } from "../model/Follow"


export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
    followUser (id: string, newFollow: Follow): Promise<any>
    unfollowUser (updateUser: updateFollowsDTO): Promise<any>
    deleteAccount (userId: string): Promise<void>
    recoverPassword (updatePassword: updatePasswordDTO): Promise<void>
}