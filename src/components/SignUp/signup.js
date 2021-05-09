import React, { useState } from "react";
import { useMoralis } from "react-moralis";

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

  handleSubmit = async event => {
    event.preventDefault();
    
    // const { signup } = useMoralis();
    const { username, email, password} = this.state;
    const user = new Moralis.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    try {
      await user.signUp();
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
          <Form.Control type="username" placeholder="Username" value={this.state.username} handleChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={this.state.email} handleChange={this.handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} handleChange={this.handleChange} />
        </Form.Group>

        <Button type="submit">Sign up</Button>
      </Form>
    );
  }
}

export default SignUp;