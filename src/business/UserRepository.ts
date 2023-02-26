import { updatePasswordDTO, User } from "../model/User"
import { Follow, updateUnfollowUserDTO } from "../model/Follow"


export interface UserRepository {
    signup (newUser: User): Promise<void>
    getAllUsers (search: string): Promise<any>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
    followUser (id: string, newFollow: Follow): Promise<any>
    unfollowUser (updateUser: updateUnfollowUserDTO): Promise<void>
    deleteAccount (userId: string): Promise<void>
    recoverPassword (updatePassword: updatePasswordDTO): Promise<void>
}