import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import "./App.css";
import About from "./pages/About";

import Gig from "./pages/gig/Gig";

const App = () => {
  // Load erdjs script for Elrond login
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://npmcdn.com/@elrondnetwork/erdjs@4.0.3/out-browser/erdjs.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={About} />
          <Route path='/gig' component={Gig} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
