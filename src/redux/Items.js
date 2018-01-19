// @flow
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { service as ItemService, entity as Item } from '../api/item';

/* ******************************************************************
    Actions
****************************************************************** */
const LOAD_ITEMS = 'abrb/Items/LOAD_ITEMS';
const LOAD_ITEMS_SUCCESS = 'abrb/Items/LOAD_ITEMS_SUCCESS';
const LOAD_ITEMS_ERROR = 'abrb/Items/LOAD_ITEMS_ERROR';
const INCREASE_MAX_ITEMS = 'abrb/Items/INCREASE_MAX_ITEMS';
const TOGGLE_LOADING = 'abrb/Items/TOGGLE_LOADING';

/* ******************************************************************
    Type definitions
****************************************************************** */
type State = {
  items: Array<Item>,
  isLoading: boolean,
  maxItems: number,
};

type Action = {
  type: string,
  payload?: Array<Item>,
};

/* ******************************************************************
    Initial state
****************************************************************** */
const initialState = {
  items: [],
  isLoading: false,
  maxItems: 5,
};

/* ******************************************************************
    Reducer
****************************************************************** */
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...initialState, isLoading: true };
    case LOAD_ITEMS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload };
    case LOAD_ITEMS_ERROR:
      return { ...state, isLoading: false };
    case INCREASE_MAX_ITEMS:
      return { ...state, maxItems: state.maxItems + 1 };
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
}

/* ******************************************************************
    Selectors
****************************************************************** */
const getStateMaxItems = (state: State) => state.maxItems;
const getStateItems = (state: State) => state.items;
export const getLoading = (state: State) => state.isLoading;

export const getItems = createSelector([getStateItems, getStateMaxItems], (items, maxItems) =>
  items.slice(0, maxItems),
);

/* ******************************************************************
    Action creators
****************************************************************** */
export const loadItems = (): Action => ({ type: LOAD_ITEMS });
export const increaseMaxItems = (): Action => ({ type: INCREASE_MAX_ITEMS });
export const toggleLoading = (): Action => ({ type: TOGGLE_LOADING });

/* ******************************************************************
    Epics
****************************************************************** */
// $FlowFixMe
const loadItemsEpic = action$ =>
  action$
    .ofType(LOAD_ITEMS)
    .delay(1000)
    .switchMap(() =>
      Observable.fromPromise(ItemService.getItems())
        .map(response => {
          const items = response.map(item => new Item(item.id, item.title, item.body));
          return { type: LOAD_ITEMS_SUCCESS, payload: items };
        })
        .catch(() => Observable.of({ type: LOAD_ITEMS_ERROR })),
    );

export const itemEpics = loadItemsEpic;
