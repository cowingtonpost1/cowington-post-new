import { useRouter } from 'next/router'
import React from 'react'
import { GetServerSideProps } from 'next'
import { server } from '../../config'
import ArticleList from '../../Components/ArticleList'
import { gql } from '@urql/core'
import { client } from '../../utils/urql'
import {
    Article,
    ArticlesDocument,
    ArticlesQuery,
} from '../../generated/graphql.d'
export const NewsPage = ({ articles }) => {
    const router = useRouter()
    const { id } = router.query
    return <ArticleList articles={articles} />
}

// export async function getServerSideProps(content) {
//     // const res = await fetch(server + `/api/articles/` id)
//     const res = await fetch(server + `/api/topic/` + content.params.id)
//     const articles = await res.json()
//     console.log(articles)
//     return {
//         props: {
//             articles,
//         },
//     }
// }
export async function getServerSideProps(content) {
    // const res = await fetch(server + `/api/articles/` id)
    const articles = await client
        .query(ArticlesDocument, { topic: content.params.id })
        .toPromise()
    return {
        props: {
            articles: articles.data.articles,
        },
    }
}
export default NewsPage
