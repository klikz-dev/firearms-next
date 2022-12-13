import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import GET_POSTS_QUERY from '@/const/schema/getPosts.graphql'

export default function Page({
  latestPosts,
  latestNews,
  latestComparisons,
  latestReviews,
  latestGuides,
  latestAccessories,
  latestSafes,
  latestOptics,
  latestHolsters,
  popularHandguns,
  popularRifles,
  popularShotguns,
}) {
  console.log(latestPosts)
  console.log(latestNews)
  console.log(latestComparisons)
  console.log(latestReviews)
  console.log(latestGuides)
  console.log(latestAccessories)
  console.log(latestSafes)
  console.log(latestOptics)
  console.log(latestHolsters)
  console.log(popularHandguns)
  console.log(popularRifles)
  console.log(popularShotguns)

  return (
    <>
      <NextSeo
        title={`Firearm Prices, Ratings, Reviews, & News`}
        description={`Get your firearm fix with our unbiased gun & gear reviews. We go deep so you can get the right gear, learn more, and shoot better.`}
      />

      <Layout></Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Latest Posts
   */
  const { data: latestPostsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 7,
    },
  })

  const latestPosts = latestPostsData?.posts?.nodes.length
    ? latestPostsData.posts.nodes
    : null

  /**
   * Latest News
   */
  const { data: latestNewsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 5,
      category: 'News',
    },
  })

  const latestNews = latestNewsData?.posts?.nodes.length
    ? latestNewsData.posts.nodes
    : null

  /**
   * Latest Comparisons
   */
  const { data: latestComparisonsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 10,
      tag: 'Comparison',
    },
  })

  const latestComparisons = latestComparisonsData?.posts?.nodes.length
    ? latestComparisonsData.posts.nodes
    : null

  /**
   * Latest Reviews
   */
  const { data: latestReviewsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 5,
      category: 'Reviews',
    },
  })

  const latestReviews = latestReviewsData?.posts?.nodes.length
    ? latestReviewsData.posts.nodes
    : null

  /**
   * Latest Guides
   */
  const { data: latestGuidesData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 5,
      category: 'Guides',
    },
  })

  const latestGuides = latestGuidesData?.posts?.nodes.length
    ? latestGuidesData.posts.nodes
    : null

  /**
   * Latest Range Gear & Accessories
   */
  const { data: latestAccessoriesData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 10,
      tag: 'accessories',
    },
  })

  const latestAccessories = latestAccessoriesData?.posts?.nodes.length
    ? latestAccessoriesData.posts.nodes
    : null

  /**
   * Latest Gun & Ammo Safes
   */
  const { data: latestSafesData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 10,
      tag: 'gun safes',
    },
  })

  const latestSafes = latestSafesData?.posts?.nodes.length
    ? latestSafesData.posts.nodes
    : null

  /**
   * Latest Scopes and Optics
   */
  const { data: latestOpticsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 10,
      tag: 'optics',
    },
  })

  const latestOptics = latestOpticsData?.posts?.nodes.length
    ? latestOpticsData.posts.nodes
    : null

  /**
   * Latest Holsters and Concealed Carry
   */
  const { data: latestHolstersData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      last: 10,
      tag: 'holsters & carry',
    },
  })

  const latestHolsters = latestHolstersData?.posts?.nodes.length
    ? latestHolstersData.posts.nodes
    : null

  /**
   * Most Popular Handguns
   */
  const popularHandgunsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=handguns`
  )
  const popularHandgunsData = await popularHandgunsRes.json()
  const popularHandguns = popularHandgunsData?.results?.length
    ? popularHandgunsData.results.slice(0, 8)
    : null

  /**
   * Most Popular Rifles
   */
  const popularRiflesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=rifles`
  )
  const popularRiflesData = await popularRiflesRes.json()
  const popularRifles = popularRiflesData?.results?.length
    ? popularRiflesData.results.slice(0, 8)
    : null

  /**
   * Most Popular Shotguns
   */
  const popularShotgunsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=shotguns`
  )
  const popularShotgunsData = await popularShotgunsRes.json()
  const popularShotguns = popularShotgunsData?.results?.length
    ? popularShotgunsData.results.slice(0, 8)
    : null

  return {
    props: {
      latestPosts,
      latestNews,
      latestComparisons,
      latestReviews,
      latestGuides,
      latestAccessories,
      latestSafes,
      latestOptics,
      latestHolsters,
      popularHandguns,
      popularRifles,
      popularShotguns,
    },
    revalidate: 10,
  }
}
