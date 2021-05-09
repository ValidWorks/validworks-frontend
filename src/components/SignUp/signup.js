import { useState } from "react";
import { useMoralis } from "react-moralis";

import {
  Button,
  Form,
} from 'react-bootstrap';

function SignUp() {
  const { signup } = useMoralis();
  const [ username, setUsername ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  return (
    <Form>
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

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
      </Form.Group>

      <Button onClick={() => signup(username, password, email)}>Sign up</Button>
    </Form>
  );
}

export default SignUp;