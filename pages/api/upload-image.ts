import aws from 'aws-sdk'
import { NextApiResponse, NextApiRequest } from 'next'
import { requireSession, RequireSessionProp, users } from '@clerk/nextjs/api'

export default requireSession(async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
) {
    if (req.session) {
        const user = await users.getUser(req.session.userId)
        if (!user.publicMetadata.writer && !user.publicMetadata.admin) {
            res.status(401).send("Unauthorized")
            return;
        }
    }
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
            ACL: 'public-read'
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    })

    res.status(200).json({imageURL: post.url+'/'+post.fields.key, ...post})

    console.log(post)
    res.status(200)
})
