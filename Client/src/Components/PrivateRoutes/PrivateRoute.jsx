import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export default function PrivateRouter({children}) {
    const { currentUser } = useAuth()
    
    return currentUser ? children: <Navigate to="/login"/>
}