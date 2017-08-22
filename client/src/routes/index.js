import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Login from '../components/homepage/Login';
import Signup from '../components/homepage/Signup';
import ResetPassword from '../components/homepage/ResetPassword';
import HomepageLayout from '../layouts/homepage';

export default (
  <Route path="/" component={App}>
    { /* Routes that use layout 1 */ }
    <Route component={HomepageLayout}>
      <IndexRoute component={Login}/>
      <Route path="signup" component={Signup} />
      <Route path="reset-password" component={ResetPassword} />
    </Route>
  </Route>
);
