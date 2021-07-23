import React from 'react'
import WriterPage from '../Components/WriterPage'
import Permission from '../models/permission.model'
import {useUser} from '@clerk/clerk-react'

const writer2 = () => {
    const user = useUser()
    if (user.publicMetadata.writer || user.publicMetadata.admin) {
        return <WriterPage></WriterPage>
    } else {
        return (
            <>
                <h1>You dont have permission to use this website.</h1>
            </>
        )
    }
}

export default writer2
