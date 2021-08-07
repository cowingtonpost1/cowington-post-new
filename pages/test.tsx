import React from 'react'
import { useSession, SignedIn } from '@clerk/clerk-react'

const Test = () => {
    const session = useSession()
    const sessionId = session?.id
    return (
        <div>
            <button
                onClick={async () => {
                    const baseUrl = 'http://localhost:5000/'
                    const reqUrl = `${baseUrl}?_clerk_session_id=${sessionId}`
                    const res = await fetch(reqUrl, {
                        credentials: 'include', // Include cookies
                    })
                }}
            >
                Click Me
            </button>
        </div>
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
