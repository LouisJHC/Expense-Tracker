import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import Expense from './Expense'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/categories" exact={true} component={Category}></Route>
        <Route path="/home" exact={true} component={Home}></Route>
        <Route path="/expenses" exact={true} component={Expense}></Route>
      </Switch>
    </Router>

  );
}

export default App;
