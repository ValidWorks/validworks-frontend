import { useState } from "react"
import { Alert, Button, CloseButton, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import moralis from 'moralis'

// const Moralis = require('moralis')

const Login = () => {
  const history = useHistory()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onLogin = (event) => {
    event.preventDefault()

    moralis.User.logIn(username, password)
      .then(() => {
        setErrorMsg('')
        history.push('/explore')
      })
      .catch((err) => {
        console.error('Error signing in.', err)
        setErrorMsg(err.toString())
      })
  }

  return (
    <div>
      {errorMsg && (
        <Alert status="error">
          <Alert.Heading>Authentication has failed</Alert.Heading>
          <p display="block">{errorMsg}</p>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Form onSubmit={onLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        </Form.Group>

        <Button type="submit">Login</Button>
      </Form>

      <small className="text-muted">
        Don&apos;t yet have an account? 
        <a href="/auth/signup"> Sign Up</a>
      </small>
    </div>
  )
}

export default Login;