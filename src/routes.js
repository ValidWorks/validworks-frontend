import React from 'react';
import { Router, Route} from 'react-router';

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import withPageTitle from "./components/PageTitle";

const routes = [
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },

  {
    path: '/auth',
    title: 'Auth',
    component: Auth,
  },
]
const wrappedRoutes = () => {
  return routes.map((route) => {
    const title = route.title ? `${route.title} • Elrond Dapp` : 'Elrond Dapp';
    return {
      path: route.path,
      component: withPageTitle(title, route.component),
    };
  });
};

export default wrappedRoutes();