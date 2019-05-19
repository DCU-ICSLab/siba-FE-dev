
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Welcome,
  } from 'containers';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Welcome} />
                </Switch>
            </div>
        );
    }
}

export default App;