import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Manage } from './views/Manage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/manage">
          <Manage />
        </Route>
        <Route path="/">
          <Hero />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
