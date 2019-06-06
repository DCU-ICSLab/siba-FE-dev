
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Welcome,
    Main,
    OAuth2RedirectHandler
  } from 'containers';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/main" component={Main} />
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                </Switch>
            </div>
        );
    }
}

export default App;