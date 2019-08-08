import { LOAD_FLIGHTS, LOAD_FLIGHT, ADD_FLIGHT, EDIT_FLIGHT, DELETE_FLIGHT } from './FlightActions';

// Initial State
const initialState = { 
	data: [],
	editedFlight: {
		_id: '',
		flightNumber: '',
		departureDateTime: '',
		arrivalDateTime: '',
		seatsTotal: '',
		price: '',
		tourists: [],
		ifAppendingTouristPossible: '',
		flightTouristsAvailableToAppend: []
	}
};

const FlightReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_FLIGHTS:
			return Object.assign({}, state, {data: action.flights});
		case LOAD_FLIGHT:
			const ifAppendingTouristPossible = (action.flight.seatsTotal > action.flight.tourists.length) ? true : false;
			const flightTouristsAvailableToAppend = action.allTourists.filter(tourist => !tourist.flights.includes(action.flight._id));
			const editedFlight = Object.assign({}, action.flight, { flightTouristsAvailableToAppend, ifAppendingTouristPossible });
			return Object.assign({}, state, { editedFlight });
		case ADD_FLIGHT:
			return Object.assign({}, state, { data: [...state.data, action.flight] });
		case EDIT_FLIGHT:
			const updatedData = [...state.data.filter(flight => flight._id !== action.flightUpdated._id), action.flightUpdated];
			return Object.assign({}, state, { data: updatedData });
		case DELETE_FLIGHT:
			const data = state.data.filter(flight => flight._id !== action.flightId);
			return Object.assign({}, state, { data });		
		default:
			return state;
	}
};

// Selector: Get all flights
export const getFlights = state => state.flights.data;

// Get a flight for editing
export const getFlight = state => state.flights.editedFlight;

export default FlightReducer;