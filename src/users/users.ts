
export type Role = 'owner' | 'admin'


export interface User {
    id:string
    email: string
    roles: Role
}
// JwtStrategy.validate() qaytaradigan req.user
export interface AuthUser {
    userId: number
    email: string
    role: string
}
