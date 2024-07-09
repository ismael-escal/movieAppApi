const mongoose = require('mongoose');

// Movie Schema
const movieSchema = new mongoose.Schema({

	title: {
		type: String,
		required: [true, 'Title is required']
	},
	director: {
		type: String,
		required: [true, 'Director is required']
	},
	year: {
		type: Number,
		required: [true, 'Year is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	genre: {
		type: String,
		required: [true, 'Genre is required']
	},
	comments: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: [true, 'UserID is required'] // Object ID
			},
			comment: {
				type: String,
				required: [true, 'Comment is required']	
			}
		}
	]
})

module.exports = mongoose.model('Movie', movieSchema);