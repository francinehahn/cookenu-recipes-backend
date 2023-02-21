import { returnFollowingUsersDTO, updatePasswordDTO, User } from "../model/UserTypes"


export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
    followUser (newFollow: User): Promise<void>
    /*unfollowUser (userId: string): Promise<void>
    getFollowingUsers (id: string): Promise<returnFollowingUsersDTO[]>
    searchFollowers (userId: string, followerId: string): Promise<any>
    deleteAccount (userId: string): Promise<void>
    recoverPassword (updatePassword: updatePasswordDTO): Promise<void>*/
}