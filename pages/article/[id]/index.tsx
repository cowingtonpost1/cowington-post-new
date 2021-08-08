import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { server } from '../../../config'
import { Heading, Text } from '@chakra-ui/react'
import { client } from '../../../utils/urql'
import { gql } from 'urql'
const article = ({ article }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <Heading>{article.title}</Heading>
            <Text>Posted at {article.date_posted}</Text>
            <br></br>
            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            <br />
            <Link href={'/topic/' + article.topic}>Go Back</Link>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(server + `/api/article/${context.params.id}`)
    const Query = gql`
        query Images($id: ID!) {
            article(id: $id) {
                title
                content
                date_posted
            }
        }
    `
    const article = await client
        .query(Query, { id: context.params.id })
        .toPromise()
    console.log(article)
    return {
        props: {
            article: article.data.article,
        },
    }
}
export default article
