import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Heading, Text } from '@chakra-ui/react'
import { client } from '../../utils/urql'
import { ArticleDocument } from '../../generated/graphql.d'
import { server } from '../../config'
const Article = ({ article }) => {
    const router = useRouter()
    const { id } = router.query
    const date = new Date(article.date_posted)

    return (
        <>
            <Heading>{article.title}</Heading>
            <Text>Posted at {date.toDateString()}</Text>
            <br></br>
            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            <br />
            <Link href={'/topic/' + article.topic}>Go Back</Link>
        </>
    )
}

export const getServerSideProps = async (context) => {
    // const article = await client
    // .query(ArticleDocument, { id: context.params.id })
    // .toPromise()
    const res = await fetch(server + '/api/article/' + context.params.id)
    const article = await res.json()
    return {
        props: {
            // article: article.data.article,
            article: article,
        },
    }
}
export default Article
