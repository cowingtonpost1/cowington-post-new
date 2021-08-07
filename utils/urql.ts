import { createClient } from '@urql/core'
import { server } from '../config'

export const client = createClient({
    url: server+'/api/graphql',
})
