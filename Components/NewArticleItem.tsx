import Image from 'next/image'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function BlogPostWithImage({ article }) {
    return (
        <Link href={'/article/' + article._id}>
            <Center py={6}>
                <Box
                    maxW={'445px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                >
                    <Stack>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}
                        >
                            {article.title}
                        </Heading>
                        <Text>Posted At {article.date_posted}</Text>
                    </Stack>
                </Box>
            </Center>
        </Link>
    )
}
