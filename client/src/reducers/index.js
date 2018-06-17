import { combineReducers } from 'redux';
import authReducer from './authReducer';

//names auth define what is state props in App
export default combineReducers({
  auth: authReducer
});
