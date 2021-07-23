import '../styles/globals.css'
import Layout from '../Components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {
    ClerkProvider,
    RedirectToSignIn,
    SignedIn,
    SignedOut,
} from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'

// Retrieve Clerk settings from the environment
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const privatePages = ['/writer']

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    /**
     * If the current route is listed as public, render it directly.
     * Otherwise, use Clerk to require authentication.
     */
    return (
        <ChakraProvider>
            <ClerkProvider
                frontendApi={clerkFrontendApi}
                navigate={(to) => router.push(to)}
            >
                <Layout>
                    {!(privatePages.includes(router.pathname)) ? (
                        <Component {...pageProps} />
                    ) : (
                        <>
                            <SignedIn>
                                <Component {...pageProps} />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    )}
                </Layout>
            </ClerkProvider>
        </ChakraProvider>
    )
}

export default MyApp
