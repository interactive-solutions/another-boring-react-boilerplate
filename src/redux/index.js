import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import items, { itemEpics } from './Items';

// Combine all epics
const rootEpic = combineEpics(itemEpics);

// Combine all reducers
const rootReducer = combineReducers({ items });

// Create middlewares
const middlewares = [createEpicMiddleware(rootEpic)];

// Add redux-logger in non-production builds
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store;
