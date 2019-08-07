import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EditTourist = props => {
	return (
		<form onSubmit={event => props.onSubmitEditTourist(event)}>
			<fieldset>
				<legend>Edit tourist's flights</legend>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='firstName'>First name</label>
					<div className='col-sm-6 col-lg-4'>
						<input
			                type='text'
			                className='form-control'
			                id='firstName'
			                value={props.tourist.firstName}
	                   		disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='lastName'>Last name</label>
					<div className='col-sm-6 col-lg-4'>	
						<input
			                type='text'
			                className='form-control'
			                id='lastName'
			                value={props.tourist.lastName}
	                   		disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='sex'>Sex</label>
					<div className='col-sm-6 col-lg-4'>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='sex'
								id='male'
								value='male'
								checked={props.tourist.sex === 'male'}
								disabled
							/>
							<label className='form-check-label' htmlFor='male'>male</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='sex'
								id='female'
								value='female'
								checked={props.tourist.sex === 'female'}
								disabled
							/>
							<label className='form-check-label' htmlFor='female'>female</label>
						</div>
					</div>
				</div>
				<div className='form-group row'>
				    <label className='col-sm-3 col-lg-2 col-form-label' htmlFor='country'>Country</label>
				    <div className='col-sm-6 col-lg-4'>
					    <select className='form-control' id='country' disabled>
					    	<option>{props.tourist.country}</option>
					    </select>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='notes'>Notes</label>
					<div className='col-sm-6 col-lg-4'>
						<textarea
			                className='form-control'
			                id='notes'
			                value={props.tourist.notes}
			                disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='birthDate'>Birth date</label>
					<div className='col-sm-6 col-lg-4'>
						<input
			                type='date'
			                min='1900-01-01'
			                max='2019-07-31'
			                className='form-control'
			                id='birthDate'
			                value={moment(props.tourist.birthDate).format('YYYY-MM-DD')}
			                disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
				    <label className='col-sm-3 col-lg-2 col-form-label' htmlFor='flightToBuy'>Flight to buy</label>
				    <div className='col-sm-6 col-lg-4'>
				    	<select 
				    		className='form-control' 
				    		id='flightToBuy'
				    		name='flightToBuy'
				    		value={props.editedForm.flightToBuy}
					    	onChange={event => props.onTouristChange(event)}
				    	>
					    	<option></option>
					    	{props.tourist.touristFlightsAvailableToBuy.map(flight => (
					    		<option key={flight._id} value={flight._id}>
					    			{flight.flightNumber}: {moment(flight.departureDateTime).format('YYYY-MM-DD h:mm')} >> {moment(flight.arrivalDateTime).format('YYYY-MM-DD h:mm')}
					    		</option>
					    	))}
					    </select>
				    </div>
				</div>
				<div className='form-group row'>
				    <label className='col-sm-3 col-lg-2 col-form-label' htmlFor='flightToRemove'>Flight to remove</label>
				    <div className='col-sm-6 col-lg-4'>
					    <select 
					    	className='form-control' 
					    	id='flightToRemove'
					    	name='flightToRemove'
					    	value={props.editedForm.flightToRemove}
					    	onChange={event => props.onTouristChange(event)}
					    >
					    	<option></option>
					    	{props.tourist.flights.map(flight => (
					    		<option key={flight._id} value={flight._id}>
					    			{flight.flightNumber}: {moment(flight.departureDateTime).format('YYYY-MM-DD h:mm')} >> {moment(flight.arrivalDateTime).format('YYYY-MM-DD h:mm')}
					    		</option>
					    	))}
					    </select>
					</div>
				</div>
				<div className='col-sm-9 col-lg-6'>
					<button className='btn btn-success float-right'>Submit</button>
				</div>
			</fieldset>
		</form>
	);
};

EditTourist.propTypes = {
	tourist: PropTypes.object,
	editedForm: PropTypes.object,
	onTouristChange: PropTypes.func,
	onSubmitEditTourist: PropTypes.func
};

export default EditTourist;