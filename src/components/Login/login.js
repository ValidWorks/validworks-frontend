import React, { useState } from "react";
import { useMoralis } from "react-moralis";

import {
  Button,
  Form,
} from 'react-bootstrap';

const Moralis = require('moralis');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    // const { login } = useMoralis();
    const { username, password } = this.state;

    try {
      await Moralis.User.login(username, password);
      this.setState({ username: "", password: ""});
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
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} handleChange={this.handleChange}/>
        </Form.Group>
  
        <Button type="submit">Login</Button>
      </Form>
    );
  }
};

export default Login;