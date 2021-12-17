// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	idValue: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	images: [String],
	category: [String],
	colors: [String],
	sizes: [[String]],
	collectionName: String,
	link: String,
});

const Product = mongoose.model('product', productSchema);

export default Product;
