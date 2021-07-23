import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import Article from '../../../models/article.model'
import { requireSession, users } from '@clerk/clerk-sdk-node'
import dbConnect from '../../../utils/dbConnect'
import { server } from '../../../config/index'
import nodemailer from 'nodemailer'
import VerificationToken from '../../../models/verificationtoken.model'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

interface RequestData {
    title: String
    content: String
}
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})
export default requireSession(async (req, res) => {
    await dbConnect()
    const data: RequestData = req.body
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
                topic: 'cow',
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
                        }>Click this link to accept the article</a><br></br><a href=${
                            server + '/api/verify/' + denyToken
                        }>Click this link to deny the article</a>`,
                    },
                    function (error, info) {
                        console.log(info, error)
                    }
                )
            } else {
                dbArticle.posted = true
            }
            res.status(200).json({ success: true })
        } catch (err) {
            console.log(err)
            res.status(401).json({ success: false })
        }
    }
})
