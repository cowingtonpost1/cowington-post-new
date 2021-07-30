import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { GetServerSideProps } from 'next'
import { server } from '../../config'
import ArticleList from '../../Components/ArticleList'

export const NewsPage = ({ articles }) => {
    const router = useRouter()
    const { id } = router.query
    return <ArticleList articles={articles} />
}

export async function getServerSideProps(content) {
    // const res = await fetch(server + `/api/articles/` id)
    // const res = await fetch(server + `/api/topic/` + content.params.id)
    var articles
    const res = await axios
        .get(server + '/api/topic/' + content.params.id)
        .then((res) => {
            articles = res.data
        })
    console.log(articles)
    return {
        props: {
            articles,
        },
    }
}

export default NewsPage
