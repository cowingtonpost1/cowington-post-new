import { NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import VerificationToken from '../../../models/verificationtoken.model'
import ImageVerificationToken from '../../../models/verificationtoken.model'
import Image from '../../../models/image.model'
import dbConnect from '../../../utils/dbConnect'

export default async function handler({ query: { id } }, res: NextApiResponse) {
    await dbConnect()
    const tokenQuery = VerificationToken.findOneAndDelete({ token: id })
    const imagequery = ImageVerificationToken.findOneAndDelete({ token: id })
    const token = await tokenQuery
    const imagetoken = await imagequery

    if (token) {
        const articleQuery = Article.findOne({ _id: token.articleId })
        const article = await articleQuery
        if (token.accpet) {
            article.posted = true
            article.date_posted = Date.now()
        }
    } else {
        const imageQuery = Image.findOne({ _id: imagetoken.imageId })
        const image = await imageQuery

        if (imagetoken.accept) {
            image.posted = true
            image.date_posted = Date.now
        }
    }

    res.status(200).json({ accepted: true })
}
