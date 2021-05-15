import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import moralis from 'moralis'

// const Moralis = require('moralis')

const appId = "bbBYitqcYOjgWocrxD77dmG5KTfMz6x7snnWuBh0"; // APP ID
const serverUrl = "https://lvgfbwbjbxtu.moralis.io:2053/server";
moralis.initialize(appId)
moralis.serverURL = serverUrl

ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider appId={appId} serverUrl={serverUrl}> */}
      <App />
    {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
