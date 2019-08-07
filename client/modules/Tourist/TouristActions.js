import callApi from '../../util/apiCaller';

// Export Constants
export const LOAD_TOURISTS = 'LOAD_TOURISTS';
export const LOAD_TOURIST = 'LOAD_TOURIST';
export const ADD_TOURIST = 'ADD_TOURIST';
export const EDIT_TOURIST = 'EDIT_TOURIST';
export const DELETE_TOURIST = 'DELETE_TOURIST';

// Export Actions
export function fetchTouristsRequest() {
	return dispatch => {
		return callApi('tourists').then(res => dispatch(loadTourists(res)));
	};
}

export function loadTourists(tourists) {
	return {
		type: LOAD_TOURISTS,
		tourists
	};
}

export function fetchTouristRequest(touristId) {
	return dispatch => {
		return callApi(`tourists/edit/${touristId}`).then(res => dispatch(loadTourist(res)));
	};
}

export function loadTourist(res) {
	return {
		type: LOAD_TOURIST,
		tourist: res.tourist,
		allFlights: res.allFlights
	};
}

export function addTouristRequest(tourist) {
	return dispatch => {
		return callApi('tourists/add', 'post', { tourist }).then(res => dispatch(addTourist(res)));
	};
}

export function addTourist(tourist) {
	return {
		type: ADD_TOURIST,
		tourist
	};
}

export function editTouristRequest(touristId, touristEditedFlights) {
	return dispatch => {
		return callApi(`tourists/edit/${touristId}`, 'put', { touristEditedFlights })
			.then(res => dispatch(editTourist(res)));
	};
}

export function editTourist(touristUpdated) {
	return {
		type: EDIT_TOURIST,
		touristUpdated
	};
}

export function deleteTouristRequest(touristId) {
	return dispatch => {
		return callApi(`tourists/${touristId}`, 'delete')
			.then(() => dispatch(deleteTourist(touristId)));
	};
}	

export function deleteTourist(touristId) {
	return {
		type: DELETE_TOURIST,
		touristId
	};
}