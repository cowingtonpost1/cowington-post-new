import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this article.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
	content: {
		type: String,
		required: true
	},
    writer: {
        type: String,
        required: [true, "Please provide the writers username"],
        maxlength: [60, "Writer's Name cannot be more than 60 characters"],
    },
    date_posted: {
        type: Date,
    },
	date_created: {
		required: true,
		type: Date
	},
	posted: {
		type: Boolean,
		required: true
	},
	topic: {
		type: String,
		required: true
	}
})

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
