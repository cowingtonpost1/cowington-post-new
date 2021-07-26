import { NextApiRequest, NextApiResponse } from 'next'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect()
    const imageQuery = Image.find({ posted: true })

    const images = await imageQuery

    res.status(200).json(images)
}
