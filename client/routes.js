/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppTemplate from './modules/AppTemplate/AppTemplate';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Home/components/Home');
  require('./modules/Tourist/components/TouristsPageContainer');
  require('./modules/Tourist/components/AddTourist/AddTouristContainer');
  require('./modules/Tourist/components/EditTourist/EditTouristContainer');
  require('./modules/Flight/components/FlightsPageContainer');
  require('./modules/Flight/components/AddFlight/AddFlightContainer');
  require('./modules/Flight/components/EditFlight/EditFlightContainer');
}

// react-router setup with code-splitting
export default (
  <Route path='/' component={AppTemplate}>
    <IndexRoute
      getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Home/components/Home').default);
          });
      }}
    />
    <Route
      path='/tourists'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Tourist/components/TouristsPageContainer').default);
        });
      }}
    />
    <Route
      path='/tourists/add'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Tourist/components/AddTourist/AddTouristContainer').default);
        });
      }}
    />    
    <Route
      path='/tourists/edit/:id'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Tourist/components/EditTourist/EditTouristContainer').default);
        });
      }}
    />
    <Route
      path='/flights'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Flight/components/FlightsPageContainer').default);
        });
      }}
    />
    <Route
      path='/flights/add'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Flight/components/AddFlight/AddFlightContainer').default);
        });
      }}
    />
    <Route
      path='/flights/edit/:id'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Flight/components/EditFlight/EditFlightContainer').default);
        });
      }}
    />
  </Route> 
);
