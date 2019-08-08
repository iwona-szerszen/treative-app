import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import EditFlight from './EditFlight';

// Import Action
import { fetchFlightRequest, editFlightRequest } from '../../FlightActions';

// Import Selector
import { getFlight } from '../../FlightReducer';

class EditFlightContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editedForm: {
				touristToAppend: '',
				touristToRemove: ''
			}
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchFlightRequest(this.props.params.id));
	}

	handleFlightChange(event) {
		const editedForm = Object.assign({}, this.state.editedForm);
		editedForm[event.target.name] = event.target.value;
		this.setState({ editedForm });
	}

	handleSubmitEditFlight(event) {
		if (confirm('Do you want to edit flight?')) {
			event.preventDefault();
			const flightEditedTourists = {
				appendedTourist: this.state.editedForm.touristToAppend,
				removedTourist: this.state.editedForm.touristToRemove
			};
			this.props.dispatch(editFlightRequest(this.props.params.id, flightEditedTourists))
				.then(this.context.router.push('flights'));
		} else {
			this.context.router.push('flights');
		}
	}

	render() {
		return (
			<EditFlight 
				flight={this.props.flight}
				editedForm={this.state.editedForm}
				onFlightChange={this.handleFlightChange.bind(this)}
				onSubmitEditFlight={this.handleSubmitEditFlight.bind(this)}
			/>
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