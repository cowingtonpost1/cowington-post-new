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
        var articleQuery = await Article.findOne({ _id: data._id })
        articleQuery.title = data.title
        articleQuery.content = data.content
        articleQuery.posted = data.posted
        articleQuery.topic = data.topic
        articleQuery.update()
        const redis = redisConnect()
        redis.del('/api/topic/' + data.topic)
    }
})
