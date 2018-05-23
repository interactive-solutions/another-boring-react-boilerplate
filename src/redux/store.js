import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';

// Rxjs operators
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import history from '../utils/history';

// Import ducks
import { reducers, epics } from './';

// Combine all epics
const rootEpic = combineEpics(...Object.values(epics));

// Combine all reducers
const rootReducer = combineReducers({ ...reducers, router: routerReducer, form: formReducer });

// Create middlewares
const middlewares = [routerMiddleware(history), createEpicMiddleware(rootEpic)];

// Add Raven middleware in production
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  middlewares.push(createRavenMiddleware(Raven));
}

// Add redux-logger in non-production builds
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const { createLogger } = require('redux-logger'); // eslint-disable-line
  const logger = createLogger({
    collapsed: true,
    // Suppress a few redux-form actions
    predicate: (getState, action) =>
      !(
        action.type === '@@redux-form/CHANGE' ||
        action.type === '@@redux-form/FOCUS' ||
        action.type === '@@redux-form/BLUR' ||
        action.type === '@@redux-form/REGISTER_FIELD' ||
        action.type === '@@redux-form/DESTROY'
      ),
  });

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store;
