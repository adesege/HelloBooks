import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from '../components/App';
import Logout from '../components/Logout';

import Profile from '../components/profile/';
import Settings from '../components/Settings';

import Login from '../components/homepage/Login';
import Signup from '../components/homepage/Signup';
import ResetPassword from '../components/homepage/ResetPassword';

import Dashboard from '../components/dashboard/Dashboard';
import Histories from '../components/books/Histories';
import Categories from '../components/books/Categories';

import Books from '../components/books/Books';
import AddBooks from '../components/books/AddBooks';
import ViewBooks from '../components/books/ViewBooks';

import StockManager from '../components/books/stockmanager/StockManager';
import ShowStock from '../components/books/stockmanager/ShowStock';

import Notifications from '../components/notifications/';


import HomepageLayout from '../layouts/homepage';
import DashboardLayout from '../layouts/dashboard';

export default (
  <Route path="/" component={App}>

    <Route component={HomepageLayout}>
      <IndexRoute component={Login}/>
      <Route path="signup" component={Signup} />
      <Route path="reset-password" component={ResetPassword} />
      <Route path="logout" component={Logout} />
    </Route>

    <Route component={DashboardLayout}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="me" component={Profile} />
      <Route path="settings" component={Settings} />
      <Route path="notifications" component={Notifications} />

      <Route path="books">
        <IndexRoute component={Books}/>
        <Route path="add" component={AddBooks} />
        <Route path="view" component={ViewBooks} />
        <Route path="histories" component={Histories} />
        <Route path="categories" component={Categories} />

        <Route path="stock-manager">
          <IndexRoute component={StockManager}/>
          <Route path="show" component={ShowStock}/>
        </Route>

      </Route>

    </Route>

  </Route>
);
