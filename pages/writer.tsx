import dynamic from 'next/dynamic'
import React from 'react'
import WriterPage from '../Components/WriterPage'
import ImageWriter from '../Components/ImageWriter'
import { useUser } from '@clerk/nextjs'
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
const Writer2 = () => {
    const user = useUser()
    if (user.publicMetadata.writer || user.publicMetadata.admin) {
        // return <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
        return (
            <>
                <Tabs>
                    <TabList>
                        <Tab>Write A Article</Tab>
                        <Tab>Upload Image</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <WriterPage />
                        </TabPanel>
                        <TabPanel>
                            <ImageWriter />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </>
        )
    } else {
        return (
            <>
                <h1>You dont have permission to use this website.</h1>
            </>
        )
    }
}

export default Writer2
