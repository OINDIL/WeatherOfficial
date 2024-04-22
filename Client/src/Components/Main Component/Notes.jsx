import React from 'react'
import { useAuth } from '../Context/AuthContext'
function Notes() {
  const {currentUser} = useAuth()
  return (
    <div>{JSON.stringify(currentUser.displayName)}</div>
  )
}

export default Notes