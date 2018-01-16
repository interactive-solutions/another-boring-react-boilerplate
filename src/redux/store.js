import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { routerReducer, routerMiddleware } from 'react-router-redux';

// Rxjs operators
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import history from '../utils/history';

// Import ducks
import { reducers, epics } from './';

// Combine all epics
const rootEpic = combineEpics(...Object.values(epics));

// Combine all reducers
const rootReducer = combineReducers({ ...reducers, router: routerReducer });

// Create middlewares
const middlewares = [routerMiddleware(history), createEpicMiddleware(rootEpic)];

// Add redux-logger in non-production builds
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const { logger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store;
