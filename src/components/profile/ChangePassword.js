import React, { useState } from 'react'
import { Button, ButtonToolbar, ButtonGroup, Form } from 'react-bootstrap'
import moralis from 'moralis'

const ChangePassword = (showForm = false) => {
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  if (!showForm) {
    return (
      <Button variant="primary">Set a new password</Button>
    )
  }

  const onSetNewPass = async (event) => {
    event.preventDefault()

    const user = moralis.User.current()

    try {
      user.setPassword(newPass)
      await user.save()
      alert("Password successfully updated!")
    } catch (error) {
      console.error("Error saving new password:", error)
      alert("Error saving the new password.")
    }
  }

  const passwordMatch = () => {
    return newPass === confirmPass
  }

  return (
    <div>
      <Form onSubmit={onSetNewPass}>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={newPass} onChange={(event) => setNewPass(event.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} />
        </Form.Group>
        <ButtonToolbar>
          <ButtonGroup className="mr-2">
            <Button variant="danger" type="submit" disabled={!passwordMatch()}>Change Password</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button variant="secondary" >Cancel</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </div>
  )
}

export default ChangePassword