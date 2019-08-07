import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import AddTourist from './AddTourist';

// Import Action
import { addTouristRequest } from '../../TouristActions';

class AddTouristContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			touristForm : {
				firstName: '',
				lastName: '',
				sex: '',
				country: '',
				notes: '',
				birthDate: ''
			}
		};
	}

	handleTouristChange(event) {
		const touristForm = Object.assign({}, this.state.touristForm);
		touristForm[event.target.name] = event.target.value;
		this.setState({ touristForm });
	}

	handleSubmitAddTourist(event) {
		if (confirm('Do you want to add new tourist?')) {
			event.preventDefault();
			const tourist = this.state.touristForm;
			this.props.dispatch(addTouristRequest(tourist)).then(this.context.router.push('/tourists'));
		}	
	}

	render() {
		return (
			<AddTourist
				touristForm={this.state.touristForm}
				onTouristChange={this.handleTouristChange.bind(this)}
				onSubmitAddTourist={this.handleSubmitAddTourist.bind(this)}
			/>
		);
	}

};

AddTouristContainer.propTypes = {
	dispatch: PropTypes.func
};

AddTouristContainer.contextTypes = {
	router: PropTypes.object
};

export default connect()(AddTouristContainer);