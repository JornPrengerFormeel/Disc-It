import React from 'react';

import { Switch, Route } from 'react-router-dom'

import Home from './common/pages/Home';



export default function App(props) {
  return (

    <Switch>

      <Route exact path = '/' component = {Home} />

      
      
    </Switch>

  );
}