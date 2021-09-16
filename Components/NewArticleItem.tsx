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
import { motion } from 'framer-motion'

export default function BlogPostWithImage({ article }) {
    const date = new Date(article.date_posted)
    console.log(article.date_posted)

    return (
        <motion.div
            whileHover={{ cursor: 'pointer', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
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
                            <Text>Posted On {date.toDateString()}</Text>
                        </Stack>
                    </Box>
                </Center>
            </Link>
        </motion.div>
    )
}
