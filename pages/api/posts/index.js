import { client } from '@/lib/apollo'
import GET_POSTS_QUERY from '@/const/schema/getPosts.graphql'

export default async function handler(req, res) {
  const { cursor } = req.query

  try {
    const { data } = await client.query({
      query: GET_POSTS_QUERY,
      variables: {
        first: 10,
        after: cursor,
      },
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}
