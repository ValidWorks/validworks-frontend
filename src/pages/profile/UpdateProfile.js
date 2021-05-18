import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
import moralis from 'moralis'

import { updateProfile } from '../../utils/UserUtils'
import WalletAddr from '../../components/profile/WalletAddr'
import ChangePassword from '../../components/profile/ChangePassword'

const UpdateProfile = () => {
  const currentUser = moralis.User.current()

  const [username, setUsername] = useState(currentUser.get("username"))
  const [email, setEmail] = useState(currentUser.get("email"))
  const [profilePhoto, setProfilePhoto] = useState(null)

  const history = useHistory()

  if (!currentUser) {
    return <Redirect to='/auth'/>
  }

  const canUpdate = [username].every(Boolean)

  const onUpdateProfile = (event) => {
    event.preventDefault()

    if (canUpdate) {
      try {
        let moralisProfile = currentUser.get("profilePhoto")
        if (profilePhoto) {
          moralisProfile = new moralis.File(profilePhoto.name, profilePhoto)
        }

        updateProfile(currentUser, username, email, moralisProfile)
          .then(() => {
            console.log('Profile successfully updated.')
            history.push('/profile/view')
          })
      } catch (error) {
        console.log("Error updating user profile:", error)
      }
    }
  }

  return (
    <div>
      <h2>Update User Profile</h2>

      <br/>

      <Form onSubmit={onUpdateProfile}>
        <Form.Group>
          <Form.File label="Upload Profile Photo" onChange={(event) => setProfilePhoto(event.target.files[0])}/>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button type="submit" disabled={!canUpdate}>Save Changes</Button>
      </Form>

      <br/>
      <ChangePassword />
      <br/>
      <WalletAddr user={currentUser} />
      <br/>
      
    </div>
  )
}

export default UpdateProfile