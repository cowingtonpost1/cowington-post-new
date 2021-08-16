import React from 'react'
import axios from 'axios'
import { server } from '../config/index'
import { Image, SimpleGrid, Box } from '@chakra-ui/react'
import { client } from '../utils/urql'
import { gql } from 'urql'
import { ImagesDocument } from '../generated/graphql.d'
export const images = ({ images }) => {
    return (
        <>
            <SimpleGrid>
                {images.map((image) => (
                    <Box key={image.url} maxWidth={600} maxHeight={800}>
                        <Image
                            alt={''}
                            src={image.url}
                            maxWidth={600}
                            maxHeight={800}
                        />
                    </Box>
                ))}
            </SimpleGrid>
        </>
    )
}

export async function getServerSideProps(content) {
    // const res = await fetch(server + `/api/art
    const images = await client.query(ImagesDocument).toPromise()
    return {
        props: {
            images: images.data.images,
        },
    }
}
export default images
