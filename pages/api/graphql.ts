import { ApolloServer, gql } from 'apollo-server-micro'
import mongoose from 'mongoose'
import Article from '../../models/article.model'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
import getOrSetCache from '../../utils/getOrSetCache'

const typeDefs = gql`
    type Query {
        articles(topic: String!): [Article!]!
		article(id: ID!): Article
		images: [Image!]!
    }
    type Article {
        _id: ID!
        title: String!
        content: String!
        date_created: String!
        date_posted: String
        posted: Boolean
    }
	type Image {
		_id: ID!
		date_created: String!
		date_posted: String!
		posted: Boolean
		url: String
	}
`

const resolvers = {
    Query: {
        async images(parent, args, context) {
            const image: any = await getOrSetCache('gql:/images/', async () => {
                await dbConnect()
                return await Image.find({})
            })
			return image
        },
        async article(parent, args, context) {
            const article: any = await getOrSetCache(
                'gql:/article/' + args.id,
                async () => {
                    await dbConnect()
                    return await Article.findOne({ _id: args.id })
                }
            )
            return await article
        },
        async articles(parent, args, context) {
            // const articles = await Article.find({ posted: true })
            const articles: any = await getOrSetCache(
                'gql:/articles/' + args.topic,
                async () => {
                    await dbConnect()
                    return await Article.find({
                        topic: args.topic,
                        posted: true,
                    }).sort({ date_posted: 'desc' })
                }
            )
            console.log(articles)
            var aarticles = []
            articles.map((article) => {
                aarticles.push({
                    _id: article._id,
                    title: article.title,
                    date_posted: article.date_posted,
                    date_created: article.date_created,
                    content: article.content,
                })
            })
            return articles
        },
    },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    await startServer
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
}

export const config = {
    api: {
        bodyParser: false,
    },
}
