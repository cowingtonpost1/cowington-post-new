import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Article from '../../../models/article.model'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect()
    try {
        const articles = await Article.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: articles })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
