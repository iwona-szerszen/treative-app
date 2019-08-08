import { Router } from 'express';
import * as FlightController from '../controllers/flight.controller';

const router = new Router();

// Get all flights
router.route('/flights').get(FlightController.getFlights);

// Get a flight by id
router.route('/flights/edit/:id').get(FlightController.getFlight);

// Add a new flight
router.route('/flights/add').post(FlightController.addFlight);

// Edit a flight by id
router.route('/flights/edit/:id').put(FlightController.editFlight);

// Delete a flight by id
router.route('/flights/:id').delete(FlightController.deleteFlight);

export default router;