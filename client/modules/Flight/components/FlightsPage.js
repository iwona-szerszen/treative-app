import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';

const FlightsPage = props => {
	return (
		<div>
			<Link to='/flights/add'>
				<button type='button' className='btn btn-success'>Add flight</button>
			</Link>
			<table>
				<thead>
					<tr>
						<th>Flight number</th>
						<th>Departure Date & Time</th>
						<th>Arrival Date & Time</th>
						<th>Total seats</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{props.flights.map(flight => (
						<tr key={flight._id}>
							<td>{flight.flightNumber}</td>
							<td>{moment(flight.departureDateTime).format('YYYY-MM-DD h:mm')}</td>
							<td>{moment(flight.arrivalDateTime).format('YYYY-MM-DD h:mm')}</td>
							<td>{flight.seatsTotal}</td>
							<td>{flight.price}</td>
							<td>
								<Link to={`/flights/edit/${flight._id}`}>
									<button type='button' className='btn btn-info'>Edit</button>
								</Link>
							</td>
							<td>
								<button 
									type='button' 
									className='btn btn-dark'
									onClick={() => props.deleteFlight(flight._id)}
								>
									Delete
								</button>
							</td>
						</tr>			
					))}
				</tbody>
			</table>
		</div>		
	);
};

FlightsPage.propTypes = {
	flights: PropTypes.array,
	deleteFlight: PropTypes.func
}

export default FlightsPage;