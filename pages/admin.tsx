import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Box,
    SimpleGrid,
} from '@chakra-ui/react'
import { server } from '../config/index'
import { useUser, SignedIn } from '@clerk/clerk-react'
import React from 'react'
import Admin from '../Components/AdminPage'

const AdminWrapper = () => {
    return (
        <SignedIn>
            <Admin />
        </SignedIn>
    )
}




export default AdminWrapper
