import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GreetinPage from './common/pages/Greeting/GreetingPage';
import LoginCallbackPage from './common/pages/LoginCallback/LoginCallbackPage';
import Discover from './common/pages/Discover';


export default function Router(props) {
    return (
        <Switch>

            <Route exact path="/" component={GreetinPage} />
            <Route path="/user/callback" component={LoginCallbackPage} />
            <Route path = "/discover" component={Discover} />

        </Switch>
    );
}
