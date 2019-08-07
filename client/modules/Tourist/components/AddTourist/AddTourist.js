import React from 'react';
import PropTypes from 'prop-types';

const AddTourist = props => {
	return (
		<form onSubmit={event => props.onSubmitAddTourist(event)}>
			<fieldset>
				<legend>Add new tourist</legend>
				<div className='form-group row'>
					<label className='col-sm-2 col-form-label' htmlFor='firstName'>First name</label>
					<div className='col-sm-4'>
						<input
			                type='text'
			                className='form-control'
			                id='firstName'
			                name='firstName'
			                value={props.touristForm.firstName}
			                onChange={event => props.onTouristChange(event)}
			                placeholder='First name'
			                required
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-2 col-form-label' htmlFor='lastName'>Last name</label>
					<div className='col-sm-4'>	
						<input
			                type='text'
			                className='form-control'
			                id='lastName'
			                name='lastName'
			                value={props.touristForm.lastName}
			                onChange={event => props.onTouristChange(event)}
			                placeholder='Last name'
			                required
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-2 col-form-label' htmlFor='sex'>Sex</label>
					<div className='col-sm-4'>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='sex'
								id='male'
								value='male'
								onChange={event => props.onTouristChange(event)}
								checked={props.touristForm.sex === 'male'}
								required
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
								onChange={event => props.onTouristChange(event)}
								checked={props.touristForm.sex === 'female'}
								required
							/>
							<label className='form-check-label' htmlFor='female'>female</label>
						</div>
					</div>
				</div>
				<div className='form-group row'>
				    <label className='col-sm-2 col-form-label' htmlFor='country'>Country</label>
				    <div className='col-sm-4'>
					    <select 
					    	className='form-control' 
					    	id='country' 
					    	name='country'
					    	value={props.touristForm.country}
					    	onChange={event => props.onTouristChange(event)}
					    	required
					    >
					    	<option value=''></option>
					    	<option value='USA'>USA</option>
					    	<option value='UK'>UK</option>
					    	<option value='Canada'>Canada</option>
					    	<option value='Japan'>Japan</option>
					    	<option value='United Arab Emirates'>United Arab Emirates</option>
					    	<option value='Switzerland'>Switzerland</option>
					    	<option value='Germany'>Germany</option>
					    	<option value='Russia'>Russia</option>
					    </select>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-2 col-form-label' htmlFor='notes'>Notes</label>
					<div className='col-sm-4'>
						<textarea
			                className='form-control'
			                id='notes'
			                name='notes'
			                value={props.touristForm.notes}
			                onChange={event => props.onTouristChange(event)}
			                placeholder='important information about the tourist - optional'
		                />
		            </div>
				</div>
				<div className='form-group row'>
					<label className='col-sm-2 col-form-label' htmlFor='birthDate'>Birth date</label>
					<div className='col-sm-4'>
						<input
			                type='date'
			                min='1900-01-01'
			                max='2019-07-31'
			                className='form-control'
			                id='birthDate'
			                name='birthDate'
			                value={props.touristForm.birthDate}
			                onChange={event => props.onTouristChange(event)}
			                required
		                />
		            </div>
				</div>
				<div className='col-sm-6'>
					<button className='btn btn-success float-right'>Submit</button>
				</div>
			</fieldset>
		</form>
	);
};

AddTourist.propTypes = {
	touristForm: PropTypes.object,
	onTouristChange: PropTypes.func,
	onSubmitAddTourist: PropTypes.func
};

export default AddTourist;