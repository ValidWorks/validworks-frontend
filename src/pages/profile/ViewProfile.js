import React from 'react'
import { Redirect } from 'react-router-dom'
import moralis from 'moralis'

const ViewProfile = () => {
  const currentUser = moralis.User.current()

  if (!currentUser) {
    return <Redirect to='/auth'/>
  }

  return (
    <div>
      <h2>
        You are at the view Profile page
      </h2>
    </div>
    
  )
  
}

export default ViewProfile