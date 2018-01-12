// @flow
import { Observable } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import Item from '../models/Item';

/* ******************************************************************
    Actions
****************************************************************** */
const LOAD_ITEMS = 'abrb/Items/LOAD_ITEMS';
const LOAD_ITEMS_SUCCESS = 'abrb/Items/LOAD_ITEMS_SUCCESS';
const LOAD_ITEMS_DONE = 'abrb/Items/LOAD_ITEMS_DONE';
const LOAD_ITEMS_ERROR = 'abrb/Items/LOAD_ITEMS_ERROR';

/* ******************************************************************
    Type definitions
****************************************************************** */
type State = {
  items: Array<Item>,
  isLoading: boolean,
};

type Action = {
  type: string,
  payload?: any,
};

/* ******************************************************************
    Initial state
****************************************************************** */
const initialState = {
  items: [],
  isLoading: false,
};

/* ******************************************************************
    Reducer
****************************************************************** */
export default function reducer(state: State = initialState, action: Action) {
  console.log(action);
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...initialState, isLoading: true };
    case LOAD_ITEMS_DONE:
      return { ...state, isLoading: false, items: action.payload };
    case LOAD_ITEMS_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

/* ******************************************************************
    Action creators
****************************************************************** */
export const loadItems = (): Action => ({ type: LOAD_ITEMS });

/* ******************************************************************
    Epics
****************************************************************** */
const loadItemsEpic = (action$): Action =>
  action$
    .ofType(LOAD_ITEMS)
    .delay(1000)
    .switchMap(() =>
      ajax
        .getJSON('https://jsonplaceholder.typicode.com/posts')
        .map(response => {
          const items = response.map(item => new Item(item.id, item.title, item.body));
          return { type: LOAD_ITEMS_DONE, payload: items };
        })
        .catch(() => Observable.of({ type: LOAD_ITEMS_ERROR })),
    );

export const itemEpics = loadItemsEpic;
