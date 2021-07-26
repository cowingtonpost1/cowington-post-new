module.exports = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    async headers() {
        return [
            {
                source: '*',
                headers: [
                    {
                        key: 'access-control-allow-origin',
                        value: '*',
                    },
                ],
            },
        ]
    },
}
