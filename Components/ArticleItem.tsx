import React from 'react'
import articleStyles from '../styles/Article.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Row, Container } from 'react-bootstrap'

// interface Article {
// title: string;
// date_posted: Date;
//
// }

function ArticleItem({ article }) {
    console.log(article)
    return (
        <>
            <Link href="/article/[id]" as={`/article/${article._id}`}>
                <Card style={{ width: '32rem', margin: 'auto' }}>
                    <Card.Body>
                        <h2>{article.title}</h2>
                        <small>Posted at {article.date_posted}</small>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}
export default ArticleItem
