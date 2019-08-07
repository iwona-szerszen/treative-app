import { LOAD_FLIGHTS, LOAD_FLIGHT, ADD_FLIGHT, DELETE_FLIGHT } from './FlightActions';

// Initial State
const initialState = { 
	data: [],
	editedFlight: {
		_id: '',
		flightNumber: '',
		departureDateTime: '1900-01-01T00:00:00',
		arrivalDateTime: '1900-01-01T00:00:00',
		seatsTotal: 0,
		price: 0,
		tourists: [],
		flightTouristsAvailableToAdd: []
	}
};

const FlightReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_FLIGHTS:
			return Object.assign({}, state, {data: action.flights});
		case LOAD_FLIGHT:
			const flightTouristsAvailableToAdd = action.allTourists.filter(tourist => !tourist.flights.includes(action.flight._id));
			const editedFlight = Object.assign({}, action.flight, { flightTouristsAvailableToAdd });
			return Object.assign({}, state, { editedFlight });
		case ADD_FLIGHT:
			const updatedData = [...state.data, action.flight];
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