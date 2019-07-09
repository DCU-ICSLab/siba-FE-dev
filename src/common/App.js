
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Welcome,
    Main,
    Device,
    OAuth2RedirectHandler,
    NotFound,
    HubAdmin
} from 'containers';
import './App.css'

const DynamicRoute = ({ match, location }) => {

    //개발자의 디바이스라면
    console.log(location);
    if (location.state) {
        const component = match.url === '/device' ? Device : HubAdmin;
        return (<Route
            path={`${match.url}/:id`}
            component={component} />
        )
    }
    else {
        return <Route component={NotFound} />
    }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/main" component={Main} />
                    <Route path="/device" component={DynamicRoute} />
                    <Route path="/hub" component={DynamicRoute} />
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;