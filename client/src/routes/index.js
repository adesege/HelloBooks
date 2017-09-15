import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from '../components/App';
import Logout from '../components/Logout';

import Profile from '../components/profile/';
import Settings from '../components/Settings';

import Login from '../components/homepage/login/Login';
import Signup from '../components/homepage/signup/Signup';
import ResetPassword from '../components/homepage/resetpassword/ResetPassword';

import Dashboard from '../components/dashboard/Dashboard';
import Histories from '../components/books/Histories';
import Categories from '../components/books/categories/Categories';

import Books from '../components/books/books/Books';
import BooksModal from '../components/books/books/BooksModal';
import DeleteModal from '../components/books/books/DeleteModal';
import ViewBooks from '../components/books/view/ViewBooks';

import StockManager from '../components/books/stockmanager/StockManager';
import ShowStock from '../components/books/stockmanager/ShowStock';

import Notifications from '../components/notifications/';


import HomepageLayout from '../layouts/homepage';
import DashboardLayout from '../layouts/dashboard';

import middleware from '../middlewares/middleware';
import adminMiddleware from '../middlewares/adminMiddleware';

export default (
  <Route path="/" component={App}>

    <Route component={HomepageLayout}>
      <IndexRoute component={Login}/>
      <Route path="signup" component={Signup} />
      <Route path="reset-password" component={ResetPassword} />
      <Route path="logout" component={Logout} />
    </Route>

    <Route component={middleware(DashboardLayout)}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="me" component={Profile} />
      <Route path="settings" component={adminMiddleware(Settings)} />
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
        <Route path="categories" component={adminMiddleware(Categories)} />

        <Route path="stock-manager">
          <IndexRoute component={adminMiddleware(StockManager)}/>
          <Route path="show" component={adminMiddleware(ShowStock)}/>
        </Route>

      </Route>

    </Route>

  </Route>
);
