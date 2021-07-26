import aws from 'aws-sdk'
import nodemailer from 'nodemailer'
import ImageVerificationToken from '../../models/ImageVerificationToken'
import { requireSession, users } from '@clerk/clerk-sdk-node'
import {server} from '../../config/index'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})
export default requireSession(async function handler(req, res) {
    await dbConnect()
    const user = users.getUser(req.session.userId)
    const user2 = await user
    if (user2.publicMetadata.writer) {
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID_COW,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_COW,
            region: process.env.AWS_REGION_COW,
            signatureVersion: 'v4',
        })

        const s3 = new aws.S3()
        const post = await s3.createPresignedPost({
            Bucket: process.env.AWS_STORAGE_BUCKET_NAME_COW,
            Fields: {
                key:
                    Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15) +
                    req.query.file,
                ACL: 'public-read',
            },
            Expires: 60, // seconds
            Conditions: [
                ['content-length-range', 0, 1048576], // up to 1 MB
            ],
        })

        const image = new Image({
            date_created: Date.now(),
            url: post.url + '/' + post.fields.key,
            posted: false
        }).save()

        const dbImage = await image
        dbImage.posted = false
        if (!user2.publicMetadata.admin) {
            const acceptToken =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15)
            const denyToken =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15)
            new ImageVerificationToken({
                imageId: dbImage._id,
                token: acceptToken,
                accept: true,
            }).save()
            new ImageVerificationToken({
                imageId: dbImage._id,
                token: denyToken,
                accept: false,
            }).save()

            transporter.sendMail(
                {
                    from: 'cowingtonpost@gmail.com',
                    to: 'spaceboy1203@gmail.com',
                    subject: 'New article needs verification',
                    html: `<h1>New image posted by ${
                        user2.username
                    } and with the contents of</h1><img src=${dbImage.url}></img> <a href=${
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
            dbImage.posted = true
            dbImage.date_posted = Date.now()
        }

        res.status(200).json(post)
    } else {
        res.status(401)
    }

})
