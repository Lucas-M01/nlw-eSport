import { createContext } from 'react'
import { UserDiscord } from '../../@types/User'

export type AuthContextType = {
    user: UserDiscord | null;
    signin: () => Promise<boolean>
    signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)