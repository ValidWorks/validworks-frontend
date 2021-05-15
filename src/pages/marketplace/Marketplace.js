import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Categories from './Categories'
import SubCategory from './SubCategory'

const Marketplace = () => {
  return (
    <Switch>
      <Route exact path="/categories">
        <Categories />
      </Route>
      <Route exact path="/categories/:cat" render={(props) => <SubCategory {...props}/>}/>
    </Switch>
  )
}

export default Marketplace;