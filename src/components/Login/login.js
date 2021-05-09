import React, { useState } from "react";

import {
  Button,
  Form,
} from 'react-bootstrap';

const Moralis = require('moralis');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const { username, password } = this.state;

    try {
      Moralis.User.logIn(username, password);
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
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="username" placeholder="Username" value={this.state.username} onChange={this.handleChange.bind(this)} />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
        </Form.Group>
  
        <Button type="submit">Login</Button>
      </Form>
    );
  }
};

export default Login;