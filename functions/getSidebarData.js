import { client } from '@/lib/apollo'
import GET_POSTS_QUERY from '@/const/schema/getPosts.graphql'

export default async function getSidebarData() {
  /**
   * Category - Reviews
   */
  const { data: reviews } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      category: 'reviews',
    },
  })

  /**
   * Category - News
   */
  const { data: news } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      category: 'news',
    },
  })

  /**
   * Tag - Comparison
   */
  const { data: comparison } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      tag: 'comparison',
    },
  })

  /**
   * Tag - Ammo
   */
  const { data: ammo } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      tag: 'ammo',
    },
  })

  /**
   * Category - Guides
   */
  const { data: guides } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      category: 'guides',
    },
  })

  /**
   * Tag - Accessories
   */
  const { data: accessories } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      tag: 'accessories',
    },
  })

  /**
   * Category - Gun Safes
   */
  const { data: gunSafes } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      category: 'gun-safes',
    },
  })

  /**
   * Category - Scopes Optics
   */
  const { data: scopesOptics } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      category: 'scopes-optics',
    },
  })

  /**
   * Tag - Holsters Carry
   */
  const { data: holstersCarry } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 3,
      tag: 'holsters-carry',
    },
  })

  return {
    reviews,
    news,
    comparison,
    ammo,
    guides,
    accessories,
    gunSafes,
    scopesOptics,
    holstersCarry,
  }
}
