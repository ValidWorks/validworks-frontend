import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import './App.css';
import About from './pages/About';
import Explore from './pages/marketplace/Explore';
import Auth from './pages/auth/Auth';
import Gig from './pages/gig/Gig';
import Profile from './pages/profile/Profile'
import Categories from './pages/marketplace/Categories';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={About}/>
          <Route path='/explore' component={Explore}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/gig' component={Gig}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;