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
    useColorModeValue,
    IconButton,
    Button,
} from '@chakra-ui/react'
import { server } from '../config/index'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { EditIcon } from '@chakra-ui/icons'
import '../styles/analytics.module.css'

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

interface Application {
    userId: string
    name: string
    age: number
    reason1: boolean
    reason2: boolean
    reason3: boolean
}

export const ApplicationCard: React.FC<{ application: Application }> = (
props
) => {
    return (
        <>
            <h1>Name: {props.application.name}</h1>
            <h1>Age: {props.application.age}</h1>
            <h1>I like cows: {(props.application.reason1 && 'Yes') || 'No'}</h1>
            <h1>
                I like the Cowington Post:{' '}
                {(props.application.reason2 && 'Yes') || 'No'}
            </h1>
            <h1>
                I like to write stories about cows:{' '}
                {(props.application.reason3 && 'Yes') || 'No'}
            </h1>

            <Button
                onClick={async () => {
                    const res = await fetch(
                        server + '/api/application/accept',
                        {
                            method: 'POST',
                            body: JSON.stringify(props.application),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                }}
            >
                Accept
            </Button>
            </>
    )
}

export const ApplicationsPage: React.FC = () => {
    const { data, error } = useSWR('/api/applications')
    console.log(data)
    if (data) {
        return (
            <>
                {data.map((application) => (
                    <ApplicationCard
                        key={application._id}
                        application={application as Application}
                        />
                ))}
                </>
        )
    } else {
        return <h1>An error occurred.</h1>
    }
}

export const AdminPage = () => {
    const { data } = useSWR('/api/articles/', fetcher)
    const user = useUser()
    if (!user.publicMetadata.admin) {
        return <Heading>Permission Denied</Heading>
    } else {
        return (
            <Tabs>
                <TabList>
                    <Tab>Analytics</Tab>
                    <Tab>Articles</Tab>
                    <Tab>Users</Tab>
                    <Tab>Unaccepted Applications</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Link
                            href={
                            'https://analytics.cowingtonpost.tk/share/cowingtonpost.tk?auth=1f5emhiblC-Hh-qcSUI3u'
                            }
                        >
                            Click here for analytics
                        </Link>
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
                    <TabPanel>
                        <h1>Coming Soon</h1>
                    </TabPanel>
                    <TabPanel>
                        <ApplicationsPage />
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
