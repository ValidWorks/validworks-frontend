import { useState } from "react"
import { useMoralis } from "react-moralis"
import { Alert, Button, CloseButton, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Moralis = require('moralis')

const Login = () => {
  const { authError } = useMoralis()
  const history = useHistory()
  // const location = useLocation()
  const [state, setState] = useState({username: '', password: '', error: ''})
  // const [, dispatch] = useStateValue()

  return (
    <div>
      {authError && (
        <Alert status="error">
          <Alert.Heading>Authentication has failed</Alert.Heading>
          <p display="block">{authError.message}</p>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          setState({ ...state, error: '' })
          // login(state.username, state.password)
          Moralis.User.logIn(state.username, state.password)
            .then(() => {
              setState({ ...state, error: '' })
              // dispatch({ type: 'reload', target: 'auth' })
              history.push('/marketplace')
            })
            .catch((err) => {
              console.error('Error signing in.', err)
              setState({ ...state, error: 'Unauthorized' })
            })
        }}
      >
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" value={state.username} onChange={(event) => setState({ ...state, username: event.currentTarget.value })} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={state.password} onChange={(event) => setState({ ...state, password: event.currentTarget.value })} />
        </Form.Group>

        <Button type="submit">Login</Button>
      </Form>

      <small class="text-muted">
        Don&apos;t yet have an account? 
        <a href="/auth/signup"> Sign Up</a>
      </small>
    </div>
  )
}

export default Login;