import { NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import dbConnect from '../../../utils/dbConnect'

export default async function handler({ query: { id } }, res: NextApiResponse) {
    await dbConnect()
    var mooArticles
    const filtered = Article.find({ topic: id, posted: true }).sort({date_created: 'descending'})
    mooArticles = await filtered
    res.status(200).json(mooArticles)
}
