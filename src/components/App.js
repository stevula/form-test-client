import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import withAuth from './auth/withAuth';
import Signup from './auth/Signup';
import Test from './Test';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <div>You are Home</div>} />
          <Route path="/signup" component={Signup} />
          <Route path="/test" component={withAuth(Test)} />
          <Route render={() => <div>Not found</div>} />
        </Switch>
      </div>
    );
  }
}
