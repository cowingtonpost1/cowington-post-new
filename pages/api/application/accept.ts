import { RequireSessionProp, requireSession, users } from '@clerk/nextjs/api'
import { NextApiRequest, NextApiResponse } from 'next'
import Application from '../../../models/application.model'
import dbConnect from '../../../utils/dbConnect'
export default requireSession(
    async (req: RequireSessionProp<NextApiRequest>, res: NextApiResponse) => {
        const user = await users.getUser(req.session.userId)

        if (user.publicMetadata.admin) {
            await dbConnect()
            const applicant = await users.getUser(req.body.user)
            if (applicant) {
                await users.updateUser(req.body.user, {
                    publicMetadata: {
                        ...user.publicMetadata,
                        writer: true,
                    },
                })
                const application = await Application.findById(req.body._id)
                application.accepted = true
                application.save()
                res.send('Application Accepted')
            } else {
                res.send({ 'user not found': true })
            }
        } else {
            res.status(401).send('Unauthorized')
        }
    }
)
