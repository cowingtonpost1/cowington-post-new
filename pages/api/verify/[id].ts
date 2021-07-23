import { NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import VerificationToken from '../../../models/verificationtoken.model'
import dbConnect from '../../../utils/dbConnect'

export default async function handler({ query: { id } }, res: NextApiResponse) {
    await dbConnect()
    const tokenQuery = VerificationToken.findOneAndDelete({ token: id })
    const token = await tokenQuery

    const articleQuery = Article.findOne({ _id: token.articleId })
    const article = await articleQuery


	if (token.accpet) {
    	article.posted = true
    	article.date_posted = Date.now()
	} 

	res.status(200).json({accepted: true});
}
