import { ApolloServer, gql } from 'apollo-server-micro'
import Article from '../../models/article.model'
import Image from '../../models/image.model'
import dbConnect from '../../utils/dbConnect'
import getOrSetCache from '../../utils/getOrSetCache'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'

import {
    withSession,
    WithSessionProp,
    users,
    sessions,
    clients,
    requireSession,
} from '@clerk/nextjs/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'
import Cookies from 'cookies'

const typeDefs = gql`
    scalar Date
    type Query {
        articles(topic: String!): [Article!]!
        article(id: ID!): Article
        images: [Image!]!
    }
    type Article {
        _id: ID!
        title: String!
        content: String!
        date_created: Date!
        date_posted: Date
        posted: Boolean
        topic: String!
    }
    type Image {
        _id: ID!
        date_created: String!
        date_posted: String!
        posted: Boolean
        url: String
    }
    type Mutation {
        createArticle(title: String!, content: String!, topic: String!): String!
    }
`

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime() // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value) // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
        }
        return null // Invalid hard-coded value (not an integer)
    },
})

const resolvers = {
    Date: dateScalar,
    Query: {
        async images() {
            const image: any = await getOrSetCache('gql:/images/', async () => {
                await dbConnect()
                return Image.find({ posted: true }).sort({
                    date_posted: 'desc',
                })
            })
            return image
        },
        async article(_parent: any, args: any) {
            const article: any = await getOrSetCache(
                'gql:/article/' + args.id,
                async () => {
                    await dbConnect()
                    return Article.findOne({ _id: args.id })
                }
            )
            return await article
        },
        async articles(parent, args) {
            // const articles = await Article.find({ posted: true })
            const articles: any = await getOrSetCache(
                'gql:/articles/' + args.topic,
                async () => {
                    await dbConnect()
                    console.log('MOOOO')
                    return Article.find({
                        topic: args.topic,
                        posted: true,
                    }).sort({ date_posted: 'desc' })
                }
            )
            console.log(articles)

            return articles
        },
    },
    Mutation: {
        createArticle: (parent, { title, content, topic }, context) => {
            console.log(context.session)
            // const writer = 'null'
            // const article = new Article({
            //     title,
            //     content,
            //     topic,
            //     date_created: Date.now(),
            //     writer,
            // }).save()
            return 'Moo!'
        },
    },
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        return await withSession((req: WithSessionProp<any>, res: any) => {
            console.log(req.session)
            return { session: req.session }
        })(req, res)
        // const cookies = new Cookies(req, res)
        // const sessionToken = cookies.get('__session')
        // const c = await clients.getClientList()
        //     const b = c.find(cl => {
        //         cl.sessions.forEach(session => {
        //             session.id ===
        //         })
        //     })
        // console.log(c)
        // console.log(sessionToken)
        // const client = await clients.verifyClient(sessionToken)
        // console.log('Client: ')
        // console.log(client)
        // const session = client.sessions.find(
        //     (session) => session.id === client.lastActiveSessionId
        // )
        // console.log(session)
        // let user = null
        // if (session) {
        //     console.log('Session: ' + session)
        //     user = await users.getUser(session.userId)
        // }
        // return { session, user }
        // return {}
    },
})

const startServer = apolloServer.start()

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    )
    // res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept'
    //
    res.setHeader('Access-Control-Allow-Headers', '*')
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
