export type Follow = {
    name: string,
    email: string
}

export interface inputFollowUserDTO {
    userId: string,
    token: string
}

export interface updateFollowsDTO {
    id: string,
    following: Follow[]
}