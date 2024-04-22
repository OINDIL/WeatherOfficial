import { createContext, useContext, useState,useEffect } from "react";
import { auth } from '../../Firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,updateProfile } from 'firebase/auth'
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateDisplayName = (displayName) =>{
        return updateProfile(currentUser,{
            displayName
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    const value = {
        currentUser,
        signUp,
        login,
        updateDisplayName
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}