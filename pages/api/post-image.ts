import aws from 'aws-sdk'
import nodemailer from 'nodemailer'
import ImageVerificationToken from '../../models/ImageVerificationToken'
import { requireSession, users, withSession } from '@clerk/clerk-sdk-node'
import { server } from '../../config/index'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
import redisConnect from '../../utils/redisConnect'
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})
export default withSession(async function handler(req, res) {
    // const Conditions = [
    //     { acl: 'public-read' },
    //     { bucket: 'cowington-post-files' },
    //     ['content-length-range', 0, 10048576],
    // ]
    await dbConnect()
    // const user = users.getUser(req.session.userId)
    // const user2 = await user
    // if (user2.publicMetadata.writer) {
    //     console.log('Mooooo')
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_COW,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_COW,
        region: process.env.AWS_REGION_COW,
        signatureVersion: 'v4',
    })

    const s3 = new aws.S3()
    // const post = await s3.createPresignedPost({
    //     Bucket: process.env.AWS_STORAGE_BUCKET_NAME_COW,
    //     Conditions,
    //     Fields: {
    //         key:
    //             Math.random().toString(36).substring(2, 15) +
    //             Math.random().toString(36).substring(2, 15) +
    //             req.query.file,
    //         ACL: 'public-read',
    //     },
    //     Expires: 60, // seconds
    // })
    const filename =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        req.query.file
    const post = s3.createPresignedPost({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME_COW,
        // Conditions,
        Fields: {
            Key: filename,
            ACL: 'public-read',
        },
        Expires: 60, // seconds
    })
    const isPosted = true
    const image = new Image({
        date_created: Date.now(),
        url: post.url + '/' + filename,
        posted: isPosted,
    }).save()

    const dbImage = await image
    dbImage.posted = true
    dbImage.date_posted = Date.now()
    dbImage.save()
    const redis = redisConnect()
    redis.flushdb()

    res.status(200).json(post)
})
