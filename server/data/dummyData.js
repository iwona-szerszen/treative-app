import Tourist from '../models/tourist';
import Flight from '../models/flight';

import tourists from './tourists.json';
import flights from './flights.json';

const dummyData = () => {

	const deleteDummyData = () => {
		const deletedDataPromises = [
			new Promise((resolve, reject) => {
				Tourist.deleteMany(err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			}),
			new Promise((resolve, reject) => {
				Flight.deleteMany(err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			}),
		];
		return Promise.all(deletedDataPromises);
	};

	const loadDummyData = () => {
		const loadedDataPromises = [
			new Promise((resolve, reject) => {
				Tourist.insertMany(tourists, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			}),	
			new Promise((resolve, reject) => {
				Flight.insertMany(flights, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			}),
		];
		return Promise.all(loadedDataPromises);
	};

	deleteDummyData()
		.then(() => {
			loadDummyData()
				.then(() => console.log('Data loaded from JSON files into database'))
				.catch(err => console.error(err));
		})
		.catch(err => console.error(err));
};

export default dummyData;