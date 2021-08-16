import React from 'react'
import NewArticleItem from './NewArticleItem'
import articleStyles from '../styles/Article.module.css'
import {
    SimpleGrid,
    Box
} from '@chakra-ui/react'
const ArticleList = ({ articles }) => {
    return (
        <SimpleGrid>
            {articles.map((article) => (
                    <Box key={article._id}>
                        <NewArticleItem article={article} />
                    </Box>
            ))}
        </SimpleGrid>
    )
}
export default ArticleList
