import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import AddFlight from './AddFlight';

// Import Action
import { addFlightRequest } from '../../FlightActions';

class AddFlightContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flightForm: {
				flightNumber: '',
				departureDateTime: '',
				arrivalDateTime: '',
				seatsTotal: '',
				price: ''
			}
		};
	}

	handleFlightChange(event) {
		const flightForm = Object.assign({}, this.state.flightForm);
		flightForm[event.target.name] = event.target.value;
		this.setState({ flightForm });
	}

	handleSubmitAddFlight(event) {
		if (confirm('Do you want to add new flight?')) {
			event.preventDefault();
			const flight = this.state.flightForm;
			this.props.dispatch(addFlightRequest(flight)).then(this.context.router.push('/flights'));
		} else {
			this.context.router.push('/flights');
		}
	}

	render() {
		return (
			<AddFlight 
				flightForm={this.state.flightForm}
				onFlightChange={this.handleFlightChange.bind(this)}
				onSubmitAddFlight={this.handleSubmitAddFlight.bind(this)}
			/>
		);
	}

};

AddFlightContainer.propTypes = {
	dispatch: PropTypes.func
};

AddFlightContainer.contextTypes = {
	router: PropTypes.object
};

export default connect()(AddFlightContainer);