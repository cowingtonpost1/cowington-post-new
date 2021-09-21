import { RequireSessionProp, requireSession, users } from '@clerk/nextjs/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default requireSession(
    async (req: RequireSessionProp<NextApiRequest>, res: NextApiResponse) => {
        const user = await users.getUser(req.session.userId)
        if (user.publicMetadata.admin) {
            res.status(200).send({ url: process.env.ANALYTICS_URL })
        }
    }
)
