import React from 'react'
import { useMoralis } from "react-moralis";
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
  const { isAuthenticated } = useMoralis();

  if (isAuthenticated) {
    return <Redirect to="/marketplace"/>
  }

  return (
    <Switch>
      <Route exact path="/auth/login">
        <Login />
      </Route>
      <Route exact path="/auth/signup">
        <SignUp />
      </Route>
      <Redirect to="/auth/login" />
    </Switch>
  )
}

export default Auth;