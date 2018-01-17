// @flow
import { Observable } from 'rxjs/Observable';
import { service as ItemService, entity as Item } from '../api/item';

/* ******************************************************************
    Actions
****************************************************************** */
const LOAD_ITEMS = 'abrb/Items/LOAD_ITEMS';
const LOAD_ITEMS_SUCCESS = 'abrb/Items/LOAD_ITEMS_SUCCESS';
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
  payload?: Array<Item>,
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
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...initialState, isLoading: true };
    case LOAD_ITEMS_SUCCESS:
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
