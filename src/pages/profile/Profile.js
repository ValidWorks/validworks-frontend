import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import UpdateProfile from './UpdateProfile'
import ViewProfile from './ViewProfile'

const Profile = () => {
  return (
    <Switch>
      <Route exact path="/profile/update">
        <UpdateProfile />
      </Route>
      <Route exact path="/profile/view">
        <ViewProfile />
      </Route>
      <Redirect to="/profile/view" />
    </Switch>
  )
}

export default Profile;