import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import EditTourist from './EditTourist';

// Import Action
import { fetchTouristRequest, editTouristRequest } from '../../TouristActions';

// Import Selector
import { getTourist } from '../../TouristReducer';

class EditTouristContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editedForm: {
				flightToBuy: '',
				flightToRemove: ''
			}
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchTouristRequest(this.props.params.id));
	}

	handleTouristChange(event) {
		const editedForm = Object.assign({}, this.state.editedForm);
		editedForm[event.target.name] = event.target.value;
		this.setState({ editedForm });
	}

	handleSubmitEditTourist(event) {
		if (confirm('Do you want to edit tourist?')) {
			event.preventDefault();
			const touristEditedFlights = {
				purchasedFlight: this.state.editedForm.flightToBuy,
				removedFlight: this.state.editedForm.flightToRemove
			};
			this.props.dispatch(editTouristRequest(this.props.params.id ,touristEditedFlights))
				.then(this.context.router.push('tourists'));
		}
	}

	render() {
		return (
			<EditTourist 
				tourist={this.props.tourist}
				editedForm={this.state.editedForm}
				onTouristChange={this.handleTouristChange.bind(this)}
				onSubmitEditTourist={this.handleSubmitEditTourist.bind(this)}
			/>
		);
	}

};

// Action required to provide data for this component to render in server side
EditTouristContainer.need = [() => { return fetchTouristRequest(this.props.params.id); }];

// Retrieve data from store as props
function mapStateToProps(state) {
	return {
		tourist: getTourist(state)
	};
}

EditTouristContainer.propTypes = {
	tourist: PropTypes.object,
	dispatch: PropTypes.func
};

EditTouristContainer.contextTypes = {
	router: PropTypes.object
};

export default connect(mapStateToProps)(EditTouristContainer);