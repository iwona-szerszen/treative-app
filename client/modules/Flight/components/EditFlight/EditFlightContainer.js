import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import EditFlight from './EditFlight';

// Import Action
import { fetchFlightRequest } from '../../FlightActions';

// Import Selector
import { getFlight } from '../../FlightReducer';

class EditFlightContainer extends Component {

	componentDidMount() {
		this.props.dispatch(fetchFlightRequest(this.props.params.id));
	}

	render() {
		return (
			<EditFlight flight={this.props.flight} />
		);
	}

};

// Action required to provide data for this component to render in server side
EditFlightContainer.need = [() => { return fetchFlightRequest(this.props.params.id); }];

// Retrieve data from store as props
function mapStateToProps(state) {
	return {
		flight: getFlight(state)
	};
}

EditFlightContainer.propTypes = {
	flight: PropTypes.object,
	dispatch: PropTypes.func
};

EditFlightContainer.contextTypes = {
	router: PropTypes.object
};

export default connect(mapStateToProps)(EditFlightContainer);