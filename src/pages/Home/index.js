import { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useMoralis } from "react-moralis";

function Home() {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) {

  }
}

export default Home;