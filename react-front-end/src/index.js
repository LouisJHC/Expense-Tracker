import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Category from './Category'
import * as serviceWorker from './serviceWorker';
import Home from './Home'
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <React.StrictMode>
    <Navigation/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
