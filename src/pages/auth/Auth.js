import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import moralis from 'moralis'

import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';

const Auth = () => {
  const currentUser = moralis.User.current()

  if (currentUser) {
    return <Redirect to="/explore"/>
  }

  return (
    <Switch>
      <Route exact path="/auth/login">
        <Login />
      </Route>
      <Route exact path="/auth/signup">
        <SignUp />
      </Route>
      <Route exact path="/auth/logout">
        <Logout />
      </Route>
      <Redirect to="/auth/login" />
    </Switch>
  )
}

export default Auth;