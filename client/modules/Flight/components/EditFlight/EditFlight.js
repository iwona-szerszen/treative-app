import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EditFlight = props => {

	return (
		<form>
			<fieldset>
				<legend>Edit flight's tourists</legend>
				<div className='form-group row'>
					<label className='col-sm-3 col-form-label' htmlFor='flightNumber'>Flight number</label>
					<div className='col-sm-3'>
						<input
			                type='text'
			                className='form-control'
			                id='flightNumber'
			                value={props.flight.flightNumber}
			                disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-form-label' htmlFor='seatsTotal'>Total seats</label>
					<div className='col-sm-3'>
						<input
			                type='number'
			                min='1'
			                className='form-control'
			                id='seatsTotal'
			                value={props.flight.seatsTotal}
			                disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-3 col-form-label' htmlFor='price'>Price</label>
					<div className='col-sm-3'>
						<input
			                type='number'
			                min='0'
			                className='form-control'
			                id='price'
			                value={props.flight.price}
			                disabled
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label 
						className='col-sm-3 col-form-label'
						htmlFor='departureDateTime'
					>
						Departure Date & Time
					</label>
					<div className='col-sm-3'>
						<input
			                type='datetime-local'
			                min='2019-08-01T00:00'
			                max='2021-08-01T00:00'
			                className='form-control'
			                id='departureDateTime'
			                value={moment(props.flight.departureDateTime).format('YYYY-MM-DDTHH:MM:ss')}
			                disabled
		                />
					</div>
				</div>
				<div className='form-group row'>
					<label 
						className='col-sm-3 col-form-label'
						htmlFor='arrivalDateTime'
					>
						Arrival Date & Time
					</label>
					<div className='col-sm-3'>
						<input
			                type='datetime-local'
			                min='2019-08-01T00:30'
			                max='2021-08-01T00:30'
			                className='form-control'
			                id='arrivalDateTime'
			                value={moment(props.flight.arrivalDateTime).format('YYYY-MM-DDTHH:MM')}
			                disabled
		                />
					</div>
				</div>



				<div className='form-group row'>
				    <label className='col-sm-3 col-form-label' htmlFor='touristToAdd'>Tourist to add to flight</label>
				    <div className='col-sm-3'>
					    <select className='form-control' id='touristToAdd'>
					    	<option> </option>
					    	
					    </select>
					</div>
				</div>
				<div className='form-group row'>
				    <label className='col-sm-3 col-form-label' htmlFor='touristToRemove'>Tourist to remove from flight</label>
				    <div className='col-sm-3'>
					    <select className='form-control' id='touristToRemove'>
					    	<option> </option>

					    </select>
					</div>
				</div>




				<div className='col-sm-6'>
					<button className='btn btn-success float-right'>Submit</button>
				</div>
			</fieldset>
		</form>	
	);
};

EditFlight.propTypes = {
	flight: PropTypes.object
};

export default EditFlight;