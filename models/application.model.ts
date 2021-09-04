import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    reason1: {
        required: false,
        type: Boolean,
    },
    reason2: {
        required: false,
        type: Boolean,
    },
    reason3: {
        required: false,
        type: Boolean,
    },
    age: {
        required: true,
        type: Number,
    },
    accepted: {
        required: true,
        type: Boolean,
        default: false,
    },
})

export default mongoose.models.Application ||
    mongoose.model('Application', ApplicationSchema)
