import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const flightSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true, unique: true },
	flightNumber: { type: 'String', required: true, unique: true },
	departureDateTime: { type: 'Date', required: true },
	arrivalDateTime: { type: 'Date', required: true },
	seatsTotal: { type: 'Number', required: true },
	price: { type: 'Number', required: true },
	tourists: [{ type: Schema.ObjectId, ref: 'Tourist', default: [] }]
	},
	{
	  usePushEach: true
	}
);

function populateTourists(next) {
	this.populate('tourists');
	next();
}

flightSchema.pre('findOne', populateTourists);

export default mongoose.model('Flight', flightSchema);