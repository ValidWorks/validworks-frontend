import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CreateGig from "./CreateGig";
import ViewGig from "./ViewGig";
import OrderGig from "./gig/OrderGig";
import OrderSuccess from "./gig/OrderSuccess";

const Gig = () => {
  return (
    <Switch>
      <Route exact path='/gig/create'>
        <CreateGig />
      </Route>
      <Route
        exact
        path='/gig/view/:gigId'
        render={(props) => <ViewGig {...props} />}
      />
      <Route
        exact
        path='/gig/order/:gigId'
        render={(props) => <OrderGig {...props} />}
      />
      <Route exact path='/gig/order/success'>
        <OrderSuccess />
      </Route>
      <Redirect to='/gig/create' />
    </Switch>
  );
};

export default Gig;
