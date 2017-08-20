import _ from 'lodash';
import { DELETE_POST, FETCH_POST, FETCH_POSTS } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case DELETE_POST:
      // look at state object, check if it has key action.payload(id)
      // remove it and return a new object that doesn't have deleted key
      return _.omit(state, action.payload)
    case FETCH_POST:
      // ES5
      // const post = action.payload.data;
      // const newState = { ...state  };
      // newState[post.id] = post;
      // return newState;

      // [ key interpilation ] - not an array
      return { ...state, [action.payload.data.id]:action.payload.data };
    case FETCH_POSTS:
      // convert state from [] to {}
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}