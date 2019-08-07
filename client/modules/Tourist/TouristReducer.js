import { LOAD_TOURISTS, LOAD_TOURIST, ADD_TOURIST, EDIT_TOURIST, DELETE_TOURIST} from './TouristActions';

// Initial State
const initialState = { 
	data: [],
	editedTourist: {
		_id: '',
		firstName: '',
		lastName: '',
		sex: '',
		country: '',
		birthDate: '',
		notes: '',
		flights: [],
		touristFlightsAvailableToBuy: []
	}
};

const TouristReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TOURISTS:
			return Object.assign({}, state, {data: action.tourists});
		case LOAD_TOURIST:
			const touristFlightsAvailableToBuy = action.allFlights.filter(flight => (!flight.tourists.includes(action.tourist._id) && (flight.seatsTotal > flight.tourists.length)) ) ;
			const editedTourist = Object.assign({}, action.tourist, { touristFlightsAvailableToBuy });
			return Object.assign({}, state, { editedTourist });
		case ADD_TOURIST:
			return Object.assign({}, state, { data: [...state.data, action.tourist] });
		case EDIT_TOURIST:
			const updatedData = [...state.data.filter(tourist => tourist._id !== action.touristUpdated._id), action.touristUpdated];
			return Object.assign({}, state, { data: updatedData });
		case DELETE_TOURIST:
			const data = state.data.filter(tourist => tourist._id !== action.touristId);
			return Object.assign({}, state, { data });
		default:
			return state;
	}
};

// Selector: Get all tourists
export const getTourists = state => state.tourists.data;

// Get a tourist for editing
export const getTourist = state => state.tourists.editedTourist;

export default TouristReducer;