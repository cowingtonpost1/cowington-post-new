import { Webhook } from "svix";
import {NextApiRequest, NextApiResponse} from 'next'
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: true,
    },
}

const secret = process.env.CLERK_SIGNING_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //const payload = (await buffer(req)).toString();
    const payload = req.body
    const headers = req.headers as any;

    const wh = new Webhook(secret);
    let msg: any;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        console.log(payload)
        console.log(headers)
        console.log(err)
        res.status(400).json({});
        return;
    }

    console.log(msg)

    res.json({});
}
