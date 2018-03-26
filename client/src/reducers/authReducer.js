import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      //when user is not logged in
      //payload is ''
      //to make a boolean out of it
      //when there is payload it will be payload
      //if not, then '' || false ==> false
      return action.payload || false;
    default:
      //if null then null will go here
      return state;
  }
}
