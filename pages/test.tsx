import React from 'react'
import { useSession, SignedIn } from '@clerk/clerk-react'
import { useCreateArticleMutation } from '../generated/graphql.d'

const Test = () => {
    const session = useSession()
    const [, createArticle] = useCreateArticleMutation()

    return (
        <>
            <button
                onClick={async () => {
                    const response = await createArticle({
                        title: 'test',
                        content: 'test',
                        topic: 'test',
                    })
                    console.log(response)
                }}
            >
                Click Me!
            </button>
        </>
    )
}

const TestWrapper = () => {
    return (
        <SignedIn>
            <Test />
        </SignedIn>
    )
}

export default TestWrapper
