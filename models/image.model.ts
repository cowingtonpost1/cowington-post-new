import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
	date_created: {
		type: Date,
		required: true
	},
	date_posted: {
		type: Date,
		required: false 
	},
	posted: {
		type: Boolean,
		required: true
	},
    url: {
		type: String,
		required: true
	}
})

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
