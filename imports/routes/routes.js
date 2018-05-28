import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';



const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnaunthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAunthenticatedPage = authenticatedPages.includes(pathname);

  if (isAunthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  } else if (isUnaunthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
