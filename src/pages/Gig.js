import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CreateGig from "./CreateGig";
import ViewGig from "./ViewGig";

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
      <Redirect to='/gig/create' />
    </Switch>
  );
};

export default Gig;
