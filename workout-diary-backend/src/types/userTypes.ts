export interface User  {
    username: string,
    password: string,
    _id: string,
}

export interface AuthRequest extends Request{
    user: User,
}