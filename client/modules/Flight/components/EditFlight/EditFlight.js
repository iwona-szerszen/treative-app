import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class EditFlight extends Component {

	renderAppendingTourist() {
		return (
			<div className='form-group row'>
			    <label className='col-sm-4 col-lg-3 col-form-label' htmlFor='touristToAdd'>Tourist to append to flight</label>
			    <div className='col-sm-4 col-lg-3'>
				    <select 
				   		className='form-control' 
				   		id='touristToAppend'
				   		name='touristToAppend'
				   		value={this.props.editedForm.touristToAppend}
				   		onChange={event => this.props.onFlightChange(event)}
				   	>
				    	<option></option>
				    	{this.props.flight.flightTouristsAvailableToAppend.map(tourist => (
				    		<option key={tourist._id} value={tourist._id}>
				    			{tourist.firstName} {tourist.lastName}, {tourist.country}
				    		</option>
				    	))}
				    </select>
				</div>
			</div>
		);
	}

	render() {
		return (
			<form onSubmit={event => this.props.onSubmitEditFlight(event)}>
				<fieldset>
					<legend>Edit flight's tourists</legend>
					<div className='form-group row'>
						<label className='col-sm-4 col-lg-3 col-form-label' htmlFor='flightNumber'>Flight number</label>
						<div className='col-sm-4 col-lg-3'>
							<input
				                type='text'
				                className='form-control'
				                id='flightNumber'
				                value={this.props.flight.flightNumber}
				                disabled
			                />
			            </div>
					</div>
					<div className='form-group row'>
						<label className='col-sm-4 col-lg-3 col-form-label' htmlFor='seatsTotal'>Total seats</label>
						<div className='col-sm-4 col-lg-3'>
							<input
				                type='number'
				                min='1'
				                className='form-control'
				                id='seatsTotal'
				                value={this.props.flight.seatsTotal}
				                disabled
			                />
			            </div>
					</div>
					<div className='form-group row'>
						<label className='col-sm-4 col-lg-3 col-form-label' htmlFor='price'>Price</label>
						<div className='col-sm-4 col-lg-3'>
							<input
				                type='number'
				                min='0'
				                className='form-control'
				                id='price'
				                value={this.props.flight.price}
				                disabled
			                />
			            </div>
					</div>
					<div className='form-group row'>
						<label 
							className='col-sm-4 col-lg-3 col-form-label'
							htmlFor='departureDateTime'
						>
							Departure Date & Time
						</label>
						<div className='col-sm-4 col-lg-3'>
							<input
				                type='datetime-local'
				                min='2019-08-01T00:00'
				                max='2021-08-01T00:00'
				                className='form-control'
				                id='departureDateTime'
				                value={moment(this.props.flight.departureDateTime).format('YYYY-MM-DDTHH:MM:ss')}
				                disabled
			                />
						</div>
					</div>
					<div className='form-group row'>
						<label 
							className='col-sm-4 col-lg-3 col-form-label'
							htmlFor='arrivalDateTime'
						>
							Arrival Date & Time
						</label>
						<div className='col-sm-4 col-lg-3'>
							<input
				                type='datetime-local'
				                min='2019-08-01T00:30'
				                max='2021-08-01T00:30'
				                className='form-control'
				                id='arrivalDateTime'
				                value={moment(this.props.flight.arrivalDateTime).format('YYYY-MM-DDTHH:MM')}
				                disabled
			                />
						</div>
					</div>
					{this.props.flight.ifAppendingTouristPossible ? this.renderAppendingTourist() : null}
					<div className='form-group row'>
					    <label className='col-sm-4 col-lg-3 col-form-label' htmlFor='touristToRemove'>Tourist to remove from flight</label>
					    <div className='col-sm-4 col-lg-3'>
						    <select 
						    	className='form-control' 
						    	id='touristToRemove'
						    	name='touristToRemove'
						    	value={this.props.editedForm.touristToRemove}
						    	onChange={event => this.props.onFlightChange(event)}
						    >
						    	<option></option>
						    	{this.props.flight.tourists.map(tourist => (
						    		<option key={tourist._id} value={tourist._id}>
						    			{tourist.firstName} {tourist.lastName}, {tourist.country}
						    		</option>
						    	))}
						    </select>
						</div>
					</div>
					<div className='col-sm-8 col-lg-6'>
						<button className='btn btn-success float-right'>Submit</button>
					</div>
				</fieldset>
			</form>	
		);
	}
}

EditFlight.propTypes = {
	flight: PropTypes.object,
	editedForm: PropTypes.object,
	onFlightChange: PropTypes.func,
	onSubmitEditFlight: PropTypes.func
};

export default EditFlight;