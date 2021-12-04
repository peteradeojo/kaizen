import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	story: {
		type: String,
		maxlength: 255,
	},
});

const Category = mongoose.model('categories', categorySchema);
export = Category;
