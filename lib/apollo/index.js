const { ApolloClient, InMemoryCache } = require('@apollo/client')

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_CMS_API_URL,
  cache: new InMemoryCache(),
})

exports.client = client
