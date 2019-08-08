import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Flight from '../models/flight';
import Tourist from '../models/tourist';
import Async from 'async';

// Get all flights
export function getFlights(req, res) {
	Flight.find().sort('flightNumber').exec((err, flights) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(flights);
	});
}

// Get a flight by id with all tourists of the system
export function getFlight(req, res) {
	Async.parallel([
	 
	    // Get a flight by id
	    function(callback) {
		    Flight.findOne({ _id: req.params.id }).exec((err, flight) => {
				if (err) {
					callback(err);
				}
				callback(null, flight);
			});
	    },
	 
	    // Get all tourists of the system
	    function(callback) {
	    	Tourist.find().exec((err, allTourists) => {
				if (err) {
					callback(err);
				}
				callback(null, allTourists);
			});
	    }
	],
	 
	//Compute all results
	function(err, results) {
	    if (err) {
	        return res.status(500).send(err);
	    }
	 
	 	const querriesResults = {
	 		flight: results[0],
	 		allTourists: results[1]
	 	};

	    return res.status(200).send(querriesResults);
	});
}

// Add a new flight
export function addFlight(req, res) {

	if (!req.body.flight.flightNumber || !req.body.flight.departureDateTime || !req.body.flight.arrivalDateTime || !req.body.flight.seatsTotal || !req.body.flight.price) {
		res.status(403).end();
	}

	const newFlight = new Flight(req.body.flight);
	newFlight._id = new mongoose.Types.ObjectId();

	// Sanitize inputs
	newFlight.flightNumber = sanitizeHtml(newFlight.flightNumber);
	newFlight.departureDateTime = sanitizeHtml(newFlight.departureDateTime);
	newFlight.arrivalDateTime = sanitizeHtml(newFlight.arrivalDateTime);
	newFlight.seatsTotal = sanitizeHtml(newFlight.seatsTotal);
	newFlight.price = sanitizeHtml(newFlight.price);

	newFlight.save((err, newFlight) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(newFlight);
	});

}

// Edit a tourist by id
export function editFlight(req, res) {

	const appendedTourist = req.body.flightEditedTourists.appendedTourist;
	const removedTourist = req.body.flightEditedTourists.removedTourist;

	if (!appendedTourist && !removedTourist) {
		res.status(403).end();
	}

	Flight.findOne({ _id: req.params.id })
		.then(flight => {
			if (appendedTourist) {
				flight.tourists.push({ _id: appendedTourist });
				Tourist.findOne({ _id: appendedTourist })
					.then(tourist => {
						tourist.flights.push({ _id: req.params.id });
						return tourist.save();
					})
					.catch(err => res.status(500).send(err));
			}
			if (removedTourist) {
				flight.tourists.pull({ _id: removedTourist });
				Tourist.findOne({ _id: removedTourist })
					.then(tourist => {
						tourist.flights.pull({ _id: req.params.id });
						return tourist.save();
					})
					.catch(err => res.status(500).send(err));
			}
			return flight.save();
		})
		.then(flightUpdated => res.json(flightUpdated))
		.catch(err => res.status(500).send(err));
}

// Delete a flight by id
export function deleteFlight(req, res) {
	Flight.findOne({ _id: req.params.id }).exec((err, flight) => {
		if (err) {
			res.status(500).send(err);
		}
		if (flight.tourists.length) {
			flight.tourists.forEach(touristId => {
				Tourist.findOne({ _id: touristId })
					.then(tourist => {
						tourist.flights.pull({ _id: req.params.id });
						return tourist.save();
					})
					.catch(err => res.status(500).send(err));
			});
		}
		flight.remove(() => {
			res.status(200).end();
		});
	});
}