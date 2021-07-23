import mongoose from 'mongoose'

const VerificationTokenSchema= new mongoose.Schema({
    token: {
		type: String,
		required: true
	},
	articleId: {
		type: mongoose.Types.ObjectId,
		required: true
	},
	accept: {
		type: Boolean,
		required:true
	}
})

export default mongoose.models.VerificationToken || mongoose.model('VerificationToken', VerificationTokenSchema);