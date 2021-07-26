import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Article from '../../../models/article.model'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect()
    try {
        const articles = Article.find({}).sort({
            date_created: 'desc',
        }) /* find all the data in our database */
        const mooArticles = await articles
        res.status(200).json(mooArticles)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
