const {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
} = require('@apollo/client')
const { onError } = require('@apollo/client/link/error')

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(locations)
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_CMS_API_URL })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
})

exports.client = client
