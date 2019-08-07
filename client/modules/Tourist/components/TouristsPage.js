import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const TouristsPage = props => {
	return (
		<div>
			<Link to='/tourists/add'>
				<button type='button' className='btn btn-success'>Add tourist</button>
			</Link>
			<table>
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Sex</th>
						<th>Country</th>
						<th>Birth date</th>
					</tr>
				</thead>
				<tbody>
					{props.tourists.map(tourist => (
						<tr key={tourist._id}>
							<td>{tourist.firstName}</td>
							<td>{tourist.lastName}</td>
							<td>{tourist.sex}</td>
							<td>{tourist.country}</td>
							<td>{new Date(tourist.birthDate).toLocaleDateString()}</td>
							<td>
								<Link to={`/tourists/edit/${tourist._id}`}>
									<button type='button' className='btn btn-info'>Edit</button>
								</Link>
							</td>
							<td>
								<button 
									type='button'
									className='btn btn-dark'
									onClick={() => props.deleteTourist(tourist._id)} 
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

TouristsPage.propTypes = {
	tourists: PropTypes.array,
	deleteTourist: PropTypes.func
};

export default TouristsPage;