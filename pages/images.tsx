import React from 'react'
import axios from 'axios'
import { server } from '../config/index'
import { Image, SimpleGrid, Box } from '@chakra-ui/react'
import { client } from '../utils/urql'
import { gql } from 'urql'
export const images = (props) => {
    console.log(props.imgs)
    return (
        <>
            <SimpleGrid>
                {props.imgs.map((image) => (
                    <Box key={image.url} maxWidth={600} maxHeight={800}>
                        <Image
                            alt={'Cow image'}
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
    const Query = gql`
        query Images {
            images {
                _id
                date_created
                posted
                url
            }
        }
    `
    const images = await client.query(Query).toPromise()
    return {
        props: {
            imgs: images.data.images,
        },
    }
}
export default images
