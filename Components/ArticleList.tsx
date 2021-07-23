import React from 'react'
import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'
import { Row, Container } from 'react-bootstrap'
const ArticleList = ({ articles }) => {
    return (
        <Container>
            {articles.map((article) => (
                    <Row className={articleStyles.articleCard}>
                        <ArticleItem article={article} />
                    </Row>
            ))}
        </Container>
    )
}
export default ArticleList
