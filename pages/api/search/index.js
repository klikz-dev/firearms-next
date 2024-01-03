import { client } from '@/lib/apollo'
import SEARCH_POSTS_QUERY from '@/const/schema/searchPosts.graphql'

export default async function handler(req, res) {
  const { q } = req.query

  try {
    const { data } = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: {
        keyword: q,
      },
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}
