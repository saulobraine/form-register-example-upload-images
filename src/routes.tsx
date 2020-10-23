import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeApp from './pages/HomeApp';
import Register from './pages/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeApp} exact />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;