import { NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import dbConnect from '../../../utils/dbConnect'
import getOrSetCache from '../../../utils/getOrSetCache'

export default async function handler({ query: { id } }, res: NextApiResponse) {
    const articles = await getOrSetCache('/api/topic/' + id, async () => {
        console.log('Cache Miss')
        await dbConnect()
        var mooArticles
        const filtered = Article.find({ topic: id, posted: true }).sort({
            date_created: 'descending',
        })
        mooArticles = await filtered
        return mooArticles
    })

    res.status(200).json(articles)
}
