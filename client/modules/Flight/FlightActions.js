import callApi from '../../util/apiCaller';

// Export Constants
export const LOAD_FLIGHTS = 'LOAD_FLIGHTS';
export const LOAD_FLIGHT = 'LOAD_FLIGHT';
export const ADD_FLIGHT = 'ADD_FLIGHT';
export const DELETE_FLIGHT = 'DELETE_FLIGHT';

// Export Actions
export function fetchFlightsRequest() {
	return dispatch => {
		return callApi('flights').then(res => dispatch(loadFlights(res)));
	};
}

export function loadFlights(flights) {
	return {
		type: LOAD_FLIGHTS,
		flights
	};
}

export function fetchFlightRequest(flightId) {
	return dispatch => {
		return callApi(`flights/edit/${flightId}`).then(res => dispatch(loadTourist(res)));
	};
}

export function loadTourist(res) {
	return {
		type: LOAD_FLIGHT,
		flight: res.flight,
		allTourists: res.allTourists
	};
}

export function addFlightRequest(flight) {
	return dispatch => {
		return callApi('flights/add', 'post', { flight }).then(res => dispatch(addFlight(res)));
	};
}

export function addFlight(flight) {
	return {
		type: ADD_FLIGHT,
		flight
	};
}

export function deleteFlightRequest(flightId) {
	return dispatch => {
		return callApi(`flights/${flightId}`, 'delete').
			then(() => dispatch(deleteFlight(flightId)));
	};
}

export function deleteFlight(flightId) {
	return {
		type: DELETE_FLIGHT,
		flightId
	};
}