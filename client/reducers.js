/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import tourists from './modules/Tourist/TouristReducer';
import flights from './modules/Flight/FlightReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  tourists,
  flights
});
