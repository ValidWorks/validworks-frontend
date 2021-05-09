import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import routes from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route, i) => (
            <Route
              path={route.path}
              key={route.path + i}
              component={route.component}
              exact={true}
            />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
