import { combineReducers, createStore, applyMiddleware } from 'redux';
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

// Create axios client for redux-axios-middleware

const store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));

export default store;
