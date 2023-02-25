import mongoose from "mongoose"
import { CustomError } from "../error/CustomError"
import { DuplicateEmail, DuplicateFollow, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, InvalidUserId, InvalidUserRole, MissingEmail, MissingPassword, MissingRole, MissingToken, MissingUserId, MissingUserName, NotPossibleToUnfollow, Unauthorized, userNotAllowedToDeleteAccount, UserNotFound } from "../error/userErrors"
import { Follow, inputFollowUserDTO, updateFollowsDTO } from "../model/Follow"
import { inputLoginDTO, inputSignupDTO, User, returnUserInfoDTO, inputDeleteAccountDTO, USER_ROLE, updatePasswordDTO, inputGetUserByIdDTO } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { transporter } from "../services/mailTransporter"
import { PasswordGenerator } from "../services/PasswordGenerator"
import { UserRepository } from "./UserRepository"


export class UserBusiness {
    constructor (private userDatabase: UserRepository) {}

    signup = async (input: inputSignupDTO): Promise<void> => {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.name) {
                throw new MissingUserName()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.role) {
                throw new MissingRole()
            }
            if (input.role.toUpperCase() !== "NORMAL" && input.role.toUpperCase() !== "ADMIN") {
                throw new InvalidUserRole()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }
            if (input.password.length < 6) {
                throw new InvalidPassword()
            }

            const duplicateEmail = await this.userDatabase.getUserByEmail(input.email)
            
            if (duplicateEmail) {
                throw new DuplicateEmail()
            }

            const hashManager = new HashManager()
            const hashPassword = await hashManager.generateHash(input.password)

            const newUser = new User(input.name, input.email, hashPassword, input.role, [])
            
            await this.userDatabase.signup(newUser)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    login = async (input: inputLoginDTO): Promise<string> => {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }
            if (input.password.length < 6) {
                throw new InvalidPassword()
            }
            
            const userEmail = await this.userDatabase.getUserByEmail(input.email)
            if(!userEmail) {
                throw new EmailNotFound()
            }

            const hashPassword = new HashManager()
            const comparePassword = await hashPassword.compareHash(input.password, userEmail.password)
            
            if (!comparePassword) {
                throw new IncorrectPassword()
            }
            
            const authenticator = new Authenticator()
            const token = await authenticator.generateToken({id: userEmail._id, role: userEmail.role})
            
            return token

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAccountInfo = async (token: string): Promise<returnUserInfoDTO> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const {id, role} = await authenticator.getTokenData(token)
            
            const user = await this.userDatabase.getUserById(id)
            
            const result: returnUserInfoDTO = {
                id: user._id,
                name: user.name,
                email: user.email
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    followUser = async (input: inputFollowUserDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.userId) {
                throw new MissingUserId()
            }
            if (!mongoose.Types.ObjectId.isValid(input.userId)) {
                throw new UserNotFound()
            }

            const idExists = await this.userDatabase.getUserById(input.userId)
            if (!idExists) {
                throw new UserNotFound()
            }

            const authenticator = new Authenticator()
            const {id, role} = await authenticator.getTokenData(input.token)

            if (id === input.userId) {
                throw new InvalidUserId()
            }

            const accountInfo = await this.userDatabase.getUserById(id)
            
            for (let item of accountInfo.following) {
                if (item.email === idExists.email) {
                    throw new DuplicateFollow()
                }
            }

            const newFollow = {
                id: idExists.id,
                name: idExists.name,
                email: idExists.email
            }

            accountInfo.following.push(newFollow)

            const updateUser: updateFollowsDTO = {
                id,
                following: accountInfo.following
            }

            await this.userDatabase.followUser(updateUser)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    unfollowUser = async (input: inputFollowUserDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.userId) {
                throw new MissingUserId()
            }
            if (!mongoose.Types.ObjectId.isValid(input.userId)) {
                throw new UserNotFound()
            }

            const user = await this.userDatabase.getUserById(input.userId)
            if (!user) {
                throw new UserNotFound()
            }

            const authenticator = new Authenticator()
            const {id, role} = await authenticator.getTokenData(input.token)

            if (id === input.userId) {
                throw new InvalidUserId()
            }

            let accountInfo = await this.userDatabase.getUserById(id)
            const userToBeUnfollowed = accountInfo.following.filter((item: Follow) => item.email === user.email)
            
            if (userToBeUnfollowed.length === 0) {
                throw new NotPossibleToUnfollow()
            }
            
            const unfollowUser = accountInfo.following.filter((item: Follow) => item.email !== user.email)
            const updateUser: updateFollowsDTO = {
                id,
                following: unfollowUser
            }

            await this.userDatabase.unfollowUser(updateUser)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserById = async (input: inputGetUserByIdDTO): Promise<returnUserInfoDTO> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.userId) {
                throw new MissingUserId()
            }
            if (!mongoose.Types.ObjectId.isValid(input.userId)) {
                throw new UserNotFound()
            }
            
            const user = await this.userDatabase.getUserById(input.userId)
            if (!user) {
                throw new UserNotFound()
            }

            const authenticator = new Authenticator()
            await authenticator.getTokenData(input.token)
            
            const result: returnUserInfoDTO = {
                id: user._id,
                name: user.name,
                email: user.email
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    deleteAccount = async (input: inputDeleteAccountDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.userId) {
                throw new MissingUserId()
            }
            if (!mongoose.Types.ObjectId.isValid(input.userId)) {
                throw new UserNotFound()
            }

            const user = await this.userDatabase.getUserById(input.userId)
            if (!user) {
                throw new UserNotFound()
            }

            const authenticator = new Authenticator()
            const {id, role} = await authenticator.getTokenData(input.token)

            if (role.toUpperCase() !== USER_ROLE.ADMIN) {
                throw new userNotAllowedToDeleteAccount()
            }

            await this.userDatabase.deleteAccount(input.userId)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    recoverPassword = async (email: string): Promise<void> => {
        try {
            if (!email) {
                throw new MissingEmail()
            }
        
            const emailExists = await this.userDatabase.getUserByEmail(email)
            if (!emailExists) {
                throw new EmailNotFound()
            }

            const newPassword = new PasswordGenerator().generatePassword()
            const hashManager = new HashManager()
            const hashPassword = await hashManager.generateHash(newPassword)

            const updatePassword: updatePasswordDTO = {
                id: emailExists.id,
                password: hashPassword
            }

            await this.userDatabase.recoverPassword(updatePassword)
            
            await transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: "Cookenu - Recuperação de senha",
                text: `Conforme solicitado, segue a nova senha gerada: ${newPassword}`,
                html: `<p>Conforme solicitado, segue a nova senha gerada: ${newPassword}</p>`
            })

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}