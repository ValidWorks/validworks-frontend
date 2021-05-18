import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Init from './Init'

const Admin = () => {
  return (
    <Switch>
      <Route exact path="/admin/init">
        <Init />
      </Route>
      <Redirect to="/admin/init" />
    </Switch>
  )
}

export default Admin