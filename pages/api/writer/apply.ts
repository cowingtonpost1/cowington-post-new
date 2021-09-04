import { requireSession, RequireSessionProp } from '@clerk/nextjs/api'
import { NextApiRequest, NextApiResponse } from 'next'
import Application from '../../../models/application.model'
import dbConnect from '../../../utils/dbConnect'

export default requireSession(
    async (req: RequireSessionProp<NextApiRequest>, res: NextApiResponse) => {
        console.log('Moo!')
        if (req.method != 'POST') {
            res.status(405).send({ err: 'Method not allowed.' })
            return
        }

        const data = req.body

        await dbConnect()
        const application = await new Application({
            user: req.session.userId,
            accepted: false,
            ...data,
        }).save()
        res.send({ success: true })
    }
)
