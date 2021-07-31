import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Box,
    Center,
    Text,
    Stack,
    SimpleGrid,
    useColorModeValue,
    IconButton,
} from '@chakra-ui/react'
import { server } from '../config/index'
import { useUser, SignedIn } from '@clerk/clerk-react'
import React from 'react'
import useSWR from 'swr'
import ArticleList from './ArticleList'
import Image from 'next/image'
import Link from 'next/link'
import { EditIcon } from '@chakra-ui/icons'

export function ArticleCard({ article }) {
    return (
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
                <Link href={'/article/' + article._id} passHref>
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
                </Link>
                <Link href={'/editarticle/' + article._id} passHref>
                    <IconButton aria-label="Edit Article" icon={<EditIcon />} />
                </Link>
            </Box>
        </Center>
    )
}

const fetcher = (url) => fetch(url).then((res) => res.json())

export const AdminPage = () => {
    const { data, error } = useSWR('/api/articles/', fetcher)
    const user = useUser()
    if (!user.publicMetadata.admin) {
        return <Heading>Permission Denied</Heading>
    } else {
        return (
            <Tabs>
                <TabList>
                    <Tab>Analytics</Tab>
                    <Tab>Unverified Articles</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        {data && (
                            <>
                                <h1>Hello</h1>
                                {data.map((article) => (
                                    <ArticleCard
                                        article={article}
                                        key={article._id}
                                    >
                                        {article.content}
                                    </ArticleCard>
                                ))}
                            </>
                        )}
                        {/* {data.map((article) => (
                                <Box key={article._id}>
                                    <h2>{article.title}</h2>
                                </Box>
                            ))} */}
                        {/* <ArticleList articles={data} /> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    }
}

// export async function getServerSideProps() {
//     const res = await fetch(server + `/api/articles/`)
//     const articles = await res.json()
//     console.log(articles)
//     return {
//         props: {
//             articles,
//         },
//     }
// }

export default AdminPage
