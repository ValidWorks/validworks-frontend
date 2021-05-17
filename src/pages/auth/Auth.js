import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import moralis from 'moralis'

import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
  const currentUser = moralis.User.current()

  if (currentUser) {
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