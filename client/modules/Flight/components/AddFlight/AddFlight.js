import React from 'react';
import PropTypes from 'prop-types';

const AddFlight = props => {

	return (
		<form onSubmit={event => props.onSubmitAddFlight(event)}>
			<fieldset>
				<legend>Add new flight</legend>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='flightNumber'>Flight number</label>
					<div className='col-sm-4 col-lg-3'>
						<input
			                type='text'
			                className='form-control'
			                id='flightNumber'
			                name='flightNumber'
			                value={props.flightForm.flightNumber}
			                onChange={event => props.onFlightChange(event)}
			                placeholder='Flight number'
			                required
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='seatsTotal'>Total seats</label>
					<div className='col-sm-4 col-lg-3'>
						<input
			                type='number'
			                min='1'
			                className='form-control'
			                id='seatsTotal'
			                name='seatsTotal'
			                value={props.flightForm.seatsTotal}
			                onChange={event => props.onFlightChange(event)}
			                placeholder='5'
			                required
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-lg-2 col-form-label' htmlFor='price'>Price</label>
					<div className='col-sm-4 col-lg-3'>
						<input
			                type='number'
			                min='0'
			                className='form-control'
			                id='price'
			                name='price'
			                value={props.flightForm.price}
			                onChange={event => props.onFlightChange(event)}
			                placeholder='100000'
			                required
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label 
						className='col-sm-3 col-lg-2 col-form-label'
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
			                name='departureDateTime'
			                value={props.flightForm.departureDateTime}
			                onChange={event => props.onFlightChange(event)}
			                required
		                />
					</div>
				</div>
				<div className='form-group row'>
					<label 
						className='col-sm-3 col-lg-2 col-form-label'
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
			                name='arrivalDateTime'
			                value={props.flightForm.arrivalDateTime}
			                onChange={event => props.onFlightChange(event)}
			                required
		                />
					</div>
				</div>
				<div className='col-sm-7 col-lg-5'>
					<button className='btn btn-success float-right'>Submit</button>
				</div>
			</fieldset>
		</form>	
	);
};

AddFlight.propTypes = {
	flightForm: PropTypes.object,
	onFlightChange: PropTypes.func,
	onSubmitAddFlight: PropTypes.func
};

export default AddFlight;