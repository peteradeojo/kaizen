import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	dateCreated: {
		type: Date,
		required: true,
	},
	link: {
		type: String,
		maxlength: 50,
	},
});

module.exports = mongoose.model('collection', collectionSchema);
