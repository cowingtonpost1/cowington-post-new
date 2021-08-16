import mongoose from 'mongoose'

const VerificationTokenSchema= new mongoose.Schema({
    token: {
		type: String,
		required: true
	},
	imageId: {
		type: mongoose.Types.ObjectId,
		required: true
	},
	accept: {
		type: Boolean,
		required:true
	}
})

export default mongoose.models.ImageVerificationToken || mongoose.model('ImageVerificationToken', VerificationTokenSchema);