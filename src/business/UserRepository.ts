import { getUserInfoDTO, updatePasswordDTO, User } from "../model/User"
import { updateFollowsDTO } from "../model/Follow"


export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<getUserInfoDTO>
    followUser (updateUser: updateFollowsDTO): Promise<void>
    unfollowUser (updateUser: updateFollowsDTO): Promise<void>
    deleteAccount (userId: string): Promise<void>
    recoverPassword (updatePassword: updatePasswordDTO): Promise<void>
}