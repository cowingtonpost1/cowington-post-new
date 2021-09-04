import { NextApiRequest, NextApiResponse } from 'next'
import { requireSession, RequireSessionProp, users } from '@clerk/nextjs/api'
import Application from '../../models/application.model'
import dbConnect from '../../utils/dbConnect'
export default requireSession(
    async (req: RequireSessionProp<NextApiRequest>, res: NextApiResponse) => {
        const user = await users.getUser(req.session.userId)
        if (user.publicMetadata.admin) {
            await dbConnect()
            const applications = await Application.find({ accepted: false })
            console.log(applications)
            res.send(applications)
        } else {
            res.status(401).send('Access Denied')
        }
    }
)
