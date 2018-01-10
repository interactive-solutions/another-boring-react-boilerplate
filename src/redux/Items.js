// @flow

// Actions
const LOAD_ITEMS = 'abrb/Items/LOAD_ITEMS';
const LOAD_ITEMS_SUCCESS = 'abrb/Items/LOAD_ITEMS_SUCCESS';
const LOAD_ITEMS_FAIL = 'abrb/Items/LOAD_ITEMS_FAIL';

type State = {
  items: Array<Object>,
  isLoading: boolean,
};

// Initial state
const initialState = {
  items: [],
  isLoading: false,
};

// Reducer
export default function reducer(state: State = initialState, action: Object) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...initialState, isLoading: true };
    case LOAD_ITEMS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.data.slice(0, 10) };
    case LOAD_ITEMS_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

type Action = {
  type: string,
  payload?: Object,
};

// Action creators
export const loadItems = (): Action => ({
  type: LOAD_ITEMS,
  payload: { request: { url: 'https://jsonplaceholder.typicode.com/posts' } },
});
