import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import placesReducer from './places_reducer.js';
import positionReducer from './position_reducer';
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  places: placesReducer,
  position: positionReducer
});

export default rootReducer;
