import Head from 'next/head'
const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <script
                async
                defer
                data-domain="cowingtonpost.com"
                src="https://analytics.cowingtonpost.com/js/plausible.js"
            />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    )
}
Meta.defaultProps = {
    title: 'Cowington Post',
    keywords: 'cow news, moo, cow, news',
    description: 'Get the latest cow news',
}
export default Meta
