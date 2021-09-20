import React from 'react'
import { Image, SimpleGrid, Box } from '@chakra-ui/react'
import { client } from '../utils/urql'
import { ImagesDocument } from '../generated/graphql.d'
import { server } from '../config'
export const images = ({ images }) => {
    return (
        <>
            <SimpleGrid>
                {images.map((image: any) => (
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

export async function getServerSideProps(_content: any) {
    const res = await fetch(server + `/api/images`)
    const images = await res.json()
    // const images = await client.query(ImagesDocument).toPromise()
    return {
        props: {
            // images: images.data.images,
            images: images,
        },
    }
}
export default images
