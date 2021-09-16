import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../../models/article.model'
import { requireSession, RequireSessionProp, users } from '@clerk/nextjs/api'
import dbConnect from '../../../utils/dbConnect'
import { server } from '../../../config'
import nodemailer from 'nodemailer'
import VerificationToken from '../../../models/verificationtoken.model'
import redisConnect from '../../../utils/redisConnect'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

interface RequestData {
    title: String
    content: String
    topic: String
}
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})
export default requireSession(
    async (req: RequireSessionProp<NextApiRequest>, res: NextApiResponse) => {
        console.log('Headers: ' + req.headers)
        await dbConnect()
        const data: RequestData = req.body
        console.log(req)
        // data.content = sanitizeHtml(data.content)
        // data.content = sanitizeHtml(data.content, {
        // allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        // })
        const user = users.getUser(req.session.userId)
        const user2 = await user
        if (user2.publicMetadata.writer || user2.publicMetadata.admin) {
            console.log('Access granted')
            console.log(user2.emailAddresses[0].emailAddress)
            try {
                const isPosted = user2.publicMetadata.admin || false
                const article = new Article({
                    title: data.title,
                    content: data.content,
                    posted: isPosted,
                    writer: user2.emailAddresses[0].emailAddress,
                    date_created: Date.now(),
                    date_posted: Date.now(),
                    topic: data.topic,
                }).save()

                const dbArticle = await article
                if (!user2.publicMetadata.admin) {
                    const acceptToken =
                        Math.random().toString(36).substring(2, 15) +
                        Math.random().toString(36).substring(2, 15)
                    const denyToken =
                        Math.random().toString(36).substring(2, 15) +
                        Math.random().toString(36).substring(2, 15)
                    new VerificationToken({
                        articleId: dbArticle._id,
                        token: acceptToken,
                        accept: true,
                    }).save()
                    new VerificationToken({
                        articleId: dbArticle._id,
                        token: denyToken,
                        accept: false,
                    }).save()

                    console.log(article)

                    transporter.sendMail(
                        {
                            from: 'cowingtonpost@gmail.com',
                            to: 'spaceboy1203@gmail.com',
                            subject: 'New article needs verification',
                            html: `<h1>New article written by ${
                                user2.username
                            } with the title of ${
                                data.title
                            } and with the contents of</h1>${
                                data.content
                            } <a href=${
                                server + '/api/verify/' + acceptToken
                            }>Click this link to accept the article</a><br/><a href=${
                                server + '/api/verify/' + denyToken
                            }>Click this link to deny the article</a>`,
                        },
                        function (error, info) {
                            console.log(info, error)
                        }
                    )
                } else {
                    dbArticle.posted = true
                    dbArticle.date_posted = Date.now()
                    dbArticle.save()
                    const redis = redisConnect()
                    redis.del('/api/topic/' + dbArticle.topic)
                    redis.del('gql:/articles/'+ dbArticle.topic)
                }
                res.status(200).json({ success: true })
            } catch (err) {
                console.log(err)
                res.status(401).json({ success: false })
            }
        }
    }
)
