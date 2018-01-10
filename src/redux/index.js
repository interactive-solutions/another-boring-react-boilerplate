import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import items from './Items';

// Combine all reducers
const reducers = combineReducers({ items });

// Create axios client for redux-axios-middleware
const client = axios.create({
  baseUrl: 'http://localhost:8080/api',
  responseType: 'json',
});

const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

export default store;
