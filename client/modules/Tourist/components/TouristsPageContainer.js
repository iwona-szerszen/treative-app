import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import TouristsPage from './TouristsPage';

// Import Action
import { fetchTouristsRequest, deleteTouristRequest } from '../TouristActions';

// Import Selector
import { getTourists } from '../TouristReducer';

class TouristsPageContainer extends Component {

	componentDidMount() {
		this.props.dispatch(fetchTouristsRequest());
	}

	handleDeleteTourist(touristId) {
		if (confirm('Do you want to delete the tourist?')) {
			this.props.dispatch(deleteTouristRequest(touristId));
		}
	}

	render() {
		return (
			<TouristsPage 
				tourists={this.props.tourists}
				deleteTourist={this.handleDeleteTourist.bind(this)}
			/>
		);
	}
};

// Action required to provide data for this component to render in server side
TouristsPageContainer.need = [() => { return fetchTouristsRequest(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
	return {
		tourists: getTourists(state)
	};
}

TouristsPageContainer.propTypes = {
	tourists: PropTypes.array,
	dispatch: PropTypes.func
};

TouristsPageContainer.contextTypes = {
	router: PropTypes.object
};

export default connect(mapStateToProps)(TouristsPageContainer);