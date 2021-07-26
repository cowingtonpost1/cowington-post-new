import aws from 'aws-sdk'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION,
        signatureVersion: 'v4',
    })

    const s3 = new aws.S3()
    const post = await s3.createPresignedPost({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Fields: {
            key:
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15) +
                req.query.file,
            ACL: 'public-read'
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    })

    res.status(200).json({imageURL: post.url+'/'+post.fields.key})

    console.log(post)
    res.status(200)
}
