import { useState } from "react"
import { UserDiscord } from "../../@types/User"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<UserDiscord | null>(null)
    
    
    
    return(
        <>
        {children}
        </>
    )
}