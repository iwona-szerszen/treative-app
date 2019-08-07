import { Router } from 'express';
import * as TouristController from '../controllers/tourist.controller';

const router = new Router();

// Get all tourists
router.route('/tourists').get(TouristController.getTourists);

// Get a tourist by id
router.route('/tourists/edit/:id').get(TouristController.getTourist);

// Add a new tourist
router.route('/tourists/add').post(TouristController.addTourist);

// Edit a tourist by id
router.route('/tourists/edit/:id').put(TouristController.editTourist);

// Delete a tourist by id
router.route('/tourists/:id').delete(TouristController.deleteTourist);

export default router;