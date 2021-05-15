import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Auth from "./pages/auth/Auth";

import withPageTitle from "./components/PageTitle";

const routes = [
  {
    path: '/',
    title: 'About',
    component: About,
    exact: true
  },
  {
    path: '/marketplace',
    title: 'Marketplace',
    component: Marketplace,
    exact: false
  },
  {
    path: '/auth',
    title: 'Auth',
    component: Auth,
    exact: false
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