import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MyGigs from './MyGigs'
import MyOrders from './MyOrders'
import CreateGig from './CreateGig'
import EditGig from './EditGig'
import ViewGig from './ViewGig'

const Gig = () => {
  return (
    <Switch>
      <Route exact path="/gig/create">
        <CreateGig />
      </Route>
      <Route exact path="/gig/my_orders">
        <MyOrders />
      </Route>
      <Route exact path="/gig/my_gigs">
        <MyGigs />
      </Route>
      <Route exact path="/gig/view/:gigId" render={(props) => <ViewGig {...props}/>}/>
      <Route exact path="/gig/edit/:gigId" render={(props) => <EditGig {...props}/>}/>
      <Redirect to="/gig/create" />
    </Switch>
  )
}

export default Gig;