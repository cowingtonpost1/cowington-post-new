import React from 'react'
import articleStyles from '../styles/Article.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Row, Container } from 'react-bootstrap'
import { motion } from 'framer-motion'
// interface Article {
// title: string;
// date_posted: Date;
//
// }

function ArticleItem({ article }) {
    console.log(article)
    return (
        <motion.div whileHover={{scale: 1.1}}>
            <Link href="/article/[id]" as={`/article/${article._id}`} passHref>
                <Card style={{ width: '32rem', margin: 'auto' }}>
                    <Card.Body>
                        <h2>{article.title}</h2>
                        <small>Posted at {article.date_posted}</small>
                    </Card.Body>
                </Card>
            </Link>
        </motion.div>
    )
}
export default ArticleItem
