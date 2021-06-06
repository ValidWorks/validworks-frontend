import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Categories from './Categories'
import SubCategory from './SubCategory'
import SubCategoryListings from './SubCategoryListings'

const Marketplace = () => {
  return (
    <Switch>
      <Route exact path="/categories">
        <Categories />
      </Route>
      <Route exact path="/categories/:cat" render={(props) => <SubCategory {...props}/>}/>
      <Route exact path="/categories/:cat/:sub" render={(props) => <SubCategoryListings {...props}/>}/>
    </Switch>
  )
}

export default Marketplace;