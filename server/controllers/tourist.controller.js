import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Tourist from '../models/tourist';
import Flight from '../models/flight';
import Async from 'async';

// Get all tourists
export function getTourists(req, res) {
	Tourist.find().sort('firstName').exec((err, tourists) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(tourists);
	});
}

// Get a tourist by id with all flights of the system
export function getTourist(req, res) {
	Async.parallel([
	 
	    // Get a tourist by id
	    function(callback) {
		    Tourist.findOne({ _id: req.params.id }).exec((err, tourist) => {
				if (err) {
					callback(err);
				}
				callback(null, tourist);
			});
	    },
	 
	    // Get all flights of the system
	    function(callback) {
	    	Flight.find().exec((err, allFlights) => {
				if (err) {
					callback(err);
				}
				callback(null, allFlights);
			});
	    }
	],
	 
	//Compute all results
	function(err, results) {
	    if (err) {
	        return res.status(500).send(err);
	    }
	 
	 	const querriesResults = {
	 		tourist: results[0],
	 		allFlights: results[1]
	 	};

	    return res.status(200).send(querriesResults);
	});
}

// Add a new tourist
export function addTourist(req, res) {

	if (!req.body.tourist.firstName || !req.body.tourist.lastName || !req.body.tourist.sex || !req.body.tourist.country || !req.body.tourist.birthDate)
		res.status(403).end();

	const newTourist = new Tourist(req.body.tourist);
	newTourist._id = new mongoose.Types.ObjectId();

	// Sanitize inputs
	newTourist.firstName = sanitizeHtml(newTourist.firstName);
	newTourist.lastName = sanitizeHtml(newTourist.lastName);
	newTourist.sex = sanitizeHtml(newTourist.sex);
	newTourist.country = sanitizeHtml(newTourist.country);
	newTourist.notes = sanitizeHtml(newTourist.notes);
	newTourist.birthDate = sanitizeHtml(newTourist.birthDate);
	
	newTourist.save((err, newTourist) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(newTourist);
	});

}

// Edit a tourist by id
export function editTourist(req, res) {

	const purchasedFlight = req.body.touristEditedFlights.purchasedFlight;
	const removedFlight = req.body.touristEditedFlights.removedFlight;
	
	if (!purchasedFlight && !removedFlight) {
		res.status(403).end();
	}

	Tourist.findOne({ _id: req.params.id })
		.then(tourist => {
			if (purchasedFlight) {
				tourist.flights.push({ _id: purchasedFlight });
				Flight.findOne({ _id: purchasedFlight })
					.then(flight => {
						flight.tourists.push({ _id: req.params.id });
						return flight.save();
					})
					.catch(err => res.status(500).send(err));
				}
			if (removedFlight) {
				tourist.flights.pull({ _id: removedFlight });
				Flight.findOne({ _id: removedFlight })
					.then(flight => {
						flight.tourists.pull({ _id: req.params.id });
						return flight.save();
					})
					.catch(err => res.status(500).send(err));
				}
			return tourist.save();
		})
		.then(touristUpdated => res.json(touristUpdated))
		.catch(err => res.status(500).send(err));
}

// Delete a tourist by id
export function deleteTourist(req, res) {
	Tourist.findOne({ _id: req.params.id }).exec((err, tourist) => {
		if (err) {
			res.status(500).send(err);
		}
		if (tourist.flights.length) {
			tourist.flights.forEach(flightId => {
				Flight.findOne({ _id: flightId })
					.then(flight => {
						flight.tourists.pull({ _id: req.params.id });
						return flight.save();
					})
					.catch(err => res.status(500).send(err));
			});		
		}
		tourist.remove(() => {
			res.status(200).end();
		});
	});
}