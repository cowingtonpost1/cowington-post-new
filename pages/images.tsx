import React from 'react'
import axios from 'axios'
import { server } from '../config/index'
import { Image, SimpleGrid, Box } from '@chakra-ui/react'
export const images = (props) => {
    console.log(props.imgs)
    return (
        <>
            <SimpleGrid>
                {props.imgs.map((image) => (
					<Box key={image.url} maxWidth={600} maxHeight={800}>
                    	<Image alt={'Cow image'} src={image.url} maxWidth={600} maxHeight={800} />
					</Box>
                ))}
            </SimpleGrid>
        </>
    )
}

export async function getServerSideProps(content) {
    // const res = await fetch(server + `/api/articles/` id)
    const res = await fetch(server + `/api/images/`)
    const articles = await res.json()
    console.log(articles)
    return {
        props: {
            imgs: articles,
        },
    }
}

export default images
