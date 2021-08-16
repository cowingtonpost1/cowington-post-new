import { createClient } from 'urql'
import { server } from '../config'

export const client = createClient({
    url: server + '/api/graphql/',
})
