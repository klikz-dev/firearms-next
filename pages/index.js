import { gql } from '@apollo/client'
import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'

export default function Page() {
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
    query: gql`
      query LatestPosts {
        posts(last: 7) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestPosts = latestPostsData?.posts?.nodes.length
    ? latestPostsData.posts.nodes
    : null

  /**
   * Latest News
   */
  const { data: latestNewsData } = await client.query({
    query: gql`
      query PostsByCategory {
        posts(last: 5, where: { categoryName: "News" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestNews = latestNewsData?.posts?.nodes.length
    ? latestNewsData.posts.nodes
    : null

  /**
   * Latest Comparisons
   */
  const { data: latestComparisonsData } = await client.query({
    query: gql`
      query PostsByTag {
        posts(last: 10, where: { tag: "Comparison" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestComparisons = latestComparisonsData?.posts?.nodes.length
    ? latestComparisonsData.posts.nodes
    : null

  /**
   * Latest Reviews
   */
  const { data: latestReviewsData } = await client.query({
    query: gql`
      query PostsByCategory {
        posts(last: 5, where: { categoryName: "Reviews" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestReviews = latestReviewsData?.posts?.nodes.length
    ? latestReviewsData.posts.nodes
    : null

  /**
   * Latest Guides
   */
  const { data: latestGuidesData } = await client.query({
    query: gql`
      query PostsByCategory {
        posts(last: 5, where: { categoryName: "Guides" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestGuides = latestGuidesData?.posts?.nodes.length
    ? latestGuidesData.posts.nodes
    : null

  /**
   * Latest Range Gear & Accessories
   */
  const { data: latestAccessoriesData } = await client.query({
    query: gql`
      query PostsByTag {
        posts(last: 10, where: { tag: "accessories" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestAccessories = latestAccessoriesData?.posts?.nodes.length
    ? latestAccessoriesData.posts.nodes
    : null

  /**
   * Latest Gun & Ammo Safes
   */
  const { data: latestSafesData } = await client.query({
    query: gql`
      query PostsByTag {
        posts(last: 10, where: { tag: "gun safes" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestSafes = latestSafesData?.posts?.nodes.length
    ? latestSafesData.posts.nodes
    : null

  /**
   * Latest Scopes and Optics
   */
  const { data: latestOpticsData } = await client.query({
    query: gql`
      query PostsByTag {
        posts(last: 10, where: { tag: "optics" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
  })

  const latestOptics = latestOpticsData?.posts?.nodes.length
    ? latestOpticsData.posts.nodes
    : null

  /**
   * Latest Holsters and Concealed Carry
   */
  const { data: latestHolstersData } = await client.query({
    query: gql`
      query PostsByTag {
        posts(last: 10, where: { tag: "holsters & carry" }) {
          nodes {
            slug
            title
            author {
              node {
                name
              }
            }
            date
            excerpt
            featuredImage {
              node {
                link
              }
            }
          }
        }
      }
    `,
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
