import mongoose from 'mongoose'

const PermissionSchema = new mongoose.Schema({
    userEmail: {
		type: String,
		required: true
	},
	groups: [String]
})

export default mongoose.models.Permission || mongoose.model('Permission', PermissionSchema);
