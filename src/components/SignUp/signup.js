import React from "react";

import {
  Button,
  Form,
} from 'react-bootstrap';

const Moralis = require('moralis');

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const { username, email, password} = this.state;
    const user = new Moralis.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    try {
      user.signUp();
      this.setState({ username: "", email: "", password: ""});
    } catch(error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </Form.Group>

        <Button type="submit">Sign up</Button>
      </Form>
    );
  }
}

export default SignUp;