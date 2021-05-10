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
    return {
      path: route.path,
      component: withPageTitle(route.title, route.component),
    };
  });
};

export default wrappedRoutes();