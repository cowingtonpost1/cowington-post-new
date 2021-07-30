import { NextApiRequest, NextApiResponse } from 'next'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
import getOrSetCache from '../../utils/getOrSetCache'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const images = await getOrSetCache('/api/images', async () => {
        await dbConnect()
        const imageQuery = Image.find({ posted: true }).sort({
            date_posted: 'descending',
        })

        const images = await imageQuery
        return images
    })

    res.status(200).json(images)
}
