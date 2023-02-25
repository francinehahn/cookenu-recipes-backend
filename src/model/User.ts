import { Follow } from "./Follow"

export enum USER_ROLE {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor (
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLE,
        private following: Follow[]
    ) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
        this.following = following
    }

    getEmail() {
        return this.email
    }
}

export interface inputSignupDTO {
    name: string,
    email: string,
    password: string,
    role: USER_ROLE
}

export interface inputLoginDTO {
    email: string,
    password: string
}

export interface returnUserInfoDTO {
    id: string,
    name: string,
    email: string
}

export interface inputGetUserByIdDTO {
    userId: string,
    token: string
}

export interface getUserInfoDTO {
    _id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLE,
    following: Follow[]
}

export interface inputDeleteAccountDTO {
    userId: string,
    token: string
}

export interface updatePasswordDTO {
    id: string,
    password: string
}