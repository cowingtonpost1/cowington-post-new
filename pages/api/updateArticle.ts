import { requireSession, users } from '@clerk/clerk-sdk-node'
import dbConnect from '../../utils/dbConnect'
import Article from '../../models/article.model'
import redisConnect from '../../utils/redisConnect'
export default requireSession(async (req, res) => {
    const session = await users.getUser(req.session.userId)
    if (!session.publicMetadata.admin) {
        req.status(401).send({ result: 'Access Denied' })
    } else {
        await dbConnect()
        const data = req.body
        console.log(data)
        const articleQuery = await Article.updateOne({ _id: data._id }, data)
        const redis = redisConnect()
        redis.del('/api/topic/' + data.topic)
        redis.del('/api/article/' + data._id)
        res.status(200).send({ success: true })
    }
})
