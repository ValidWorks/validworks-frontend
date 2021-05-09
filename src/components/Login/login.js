import { useState } from "react";
import { useMoralis } from "react-moralis";

import {
  Button,
  Form,
} from 'react-bootstrap';

function Login() {
  const { login } = useMoralis();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (

    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
      </Form.Group>

      <Button onClick={() => login(username, password)}>Login</Button>
    </Form>
  );
};

export default Login;