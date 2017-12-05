import React from 'react';
import {
  Route,
  IndexRoute,
  Router,
  browserHistory } from 'react-router';

import App from 'components/App';

import Profile from 'components/Profile/';

import Login from 'components/homepage/Login';
import Signup from 'components/homepage/Signup';
import ResetPassword from 'components/homepage/ResetPassword';
import ChangePassword from 'components/homepage/ResetPassword/ChangePassword';

import Dashboard from 'components/Dashboard';
import Histories from 'components/Books/Histories';
import Categories from 'components/Books/Categories';

import Books from 'components/Books';
import BooksModal from 'components/Books/BooksModal';
import DeleteModal from 'components/Books/DeleteModal';
import ViewBooks from 'components/Books/ViewBooks';

import StockManager from 'components/Books/StockManager';
import ShowStock from 'components/Books/StockManager/ShowStock';

import Notifications from 'components/Notifications';

import HomepageLayout from 'components/layouts/Homepage';
import DashboardLayout from 'components/layouts/Dashboard';

import middleware from 'components/middlewares/middleware';
import adminMiddleware from 'components/middlewares/adminMiddleware';

/**
 * @returns {JSX} JSX
 */
const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>

      <Route component={HomepageLayout}>
        <IndexRoute component={Login}/>
        <Route path="signup" component={Signup} />
        <Route path="reset-password" component={ResetPassword} />
        <Route path="reset-password/verify/:validationKey" component={ChangePassword} />
      </Route>

      <Route component={middleware(DashboardLayout)}>
        <Route path="dashboard" component={Dashboard} />
        <Route path="me" component={Profile} />
        <Route path="notifications" component={adminMiddleware(Notifications)} />

        <Route path="books">
          <IndexRoute component={Books} />
          <Route component={Books}>
            <Route path="add" component={BooksModal} />
            <Route path="edit/:id" component={BooksModal} />
            <Route path="delete/:id" component={DeleteModal} />
          </Route>
          <Route path="view/:id" component={ViewBooks} />
          <Route path="histories" component={Histories} />
          <Route
            path="categories"
            component={adminMiddleware(Categories)} />

          <Route path="stock-manager">
            <IndexRoute component={adminMiddleware(StockManager)}/>
            <Route path=":id" component={adminMiddleware(ShowStock)}/>
          </Route>

        </Route>

      </Route>

    </Route>
  </Router>
);

export default Routes;
