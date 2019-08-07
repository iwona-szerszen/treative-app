import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import FlightsPage from './FlightsPage';

// Import Action
import { fetchFlightsRequest, deleteFlightRequest } from '../FlightActions';

// Import Selector
import { getFlights } from '../FlightReducer';

class FlightsPageContainer extends Component {

	componentDidMount() {
		this.props.dispatch(fetchFlightsRequest());
	}

	handleDeleteFlight(flightId) {
		if (confirm('Do you want to delete the flight?')) {
			this.props.dispatch(deleteFlightRequest(flightId));
		}
	}

	render() {
		return (
			<FlightsPage 
				flights={this.props.flights} 
				deleteFlight={this.handleDeleteFlight.bind(this)}
			/>
		);
	}
};

// Action required to provide data for this component to render in server side
FlightsPageContainer.need = [() => { return fetchFlightsRequest(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
	return {
		flights: getFlights(state)
	};
}

FlightsPageContainer.propTypes = {
	flights: PropTypes.array,
	dispatch: PropTypes.func
};

FlightsPageContainer.contextTypes = {
	router: PropTypes.object
};

export default connect(mapStateToProps)(FlightsPageContainer);