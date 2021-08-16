import { NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import dbConnect from '../../../utils/dbConnect'
import getOrSetCache from '../../../utils/getOrSetCache'

export default async function handler({ query: { id } }, res: NextApiResponse) {
    const filtered = await getOrSetCache('/api/article/' + id, async () => {
        await dbConnect()
        // const filtered = articles.filter((article) => article.id === id)
        const filtered = await Article.findOne({ _id: id }).exec()
        console.log(filtered)
        return filtered
    })

    if (filtered) {
        res.status(200).json(filtered)
    } else {
        res.status(404).json({
            message: `Article with the id of ${id} is not found`,
        })
    }
}
