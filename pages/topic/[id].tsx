import { useRouter } from 'next/router'
import React from 'react'
import { server } from '../../config'
import ArticleList from '../../Components/ArticleList'

export const NewsPage = ({ articles }) => {
    const router = useRouter()
    const { id } = router.query
    return <ArticleList articles={articles} />
}

export const getServerSideProps = async (content) => {
    const res = await fetch(server + `/api/topic/` + content.params.id)
    const articles = await res.json()
    console.log(articles)
    return {
        props: {
            articles,
        },
    }
}

export default NewsPage
