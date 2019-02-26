import React from 'react';

import { Switch, Route } from 'react-router-dom'

import GreetinPage from './common/pages/Greeting/GreetingPage';



export default function App(props) {
  return (

    <Switch>

      <Route exact path = '/' component = {GreetinPage} />

      
      
    </Switch>

  );
}