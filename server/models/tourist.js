import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const touristSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true, unique: true },
	firstName: { type: 'String', required: true },
	lastName: { type: 'String', required: true },
	sex: { type: 'String', required: true },
	country: { type: 'String', required: true },
	birthDate: { type: 'Date', required: true },
	notes: { type: 'String', default: '' },
	flights: [{ type: Schema.ObjectId, ref: 'Flight', default: [] }]
	},
	{
	  usePushEach: true
	}
);

function populateFlights(next) {
	this.populate('flights');
	next();
}

touristSchema.pre('findOne', populateFlights);

export default mongoose.model('Tourist', touristSchema);