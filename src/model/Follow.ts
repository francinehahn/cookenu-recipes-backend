export type Follow = {
    id: string,
    name: string,
    email: string
}

export interface inputFollowUserDTO {
    userId: string,
    token: string
}

export interface updateUnfollowUserDTO {
    id: string,
    followingId: string
}