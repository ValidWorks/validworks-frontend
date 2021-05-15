import { useState } from "react"
import { useMoralis } from "react-moralis"
import { Alert, Button, CloseButton, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Moralis = require('moralis')

const SignUp = () => {
  const { authError } = useMoralis()
  const history = useHistory()
  // const location = useLocation()
  const [state, setState] = useState({username: '', email: '', password: '', error: ''})

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
          // signup(state.username, state.password, state.email)
          const user = new Moralis.User();
          user.set("username", state.username);
          user.set("password", state.password);
          user.set("email", state.email);
          
          user.signUp()
            .then(() => {
              setState({ ...state, error: '' })
              // dispatch({ type: 'reload', target: 'auth' })
              history.push('/marketplace')
            })
            .catch((err) => {
              console.error('Error signing up', err)
              setState({ ...state, error: 'Unauthorized' })
            })
        }}
      >
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" value={state.username} onChange={(event) => setState({ ...state, username: event.currentTarget.value })} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={state.email} onChange={(event) => setState({ ...state, email: event.currentTarget.value })} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        
        
        <Form.Group controlId="formBasicPassword">
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password" 
            value={state.password} 
            onChange={(event) => setState({ ...state, password: event.currentTarget.value })}
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and numbers, and
            must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        <Button type="submit">Sign Up</Button>
      </Form>

      <small class="text-muted">
        Already have an account?
        <a href="/auth/login"> Login</a>
      </small>
    </div>
  );
}

export default SignUp;