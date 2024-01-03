import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import GET_POSTS_QUERY from '@/const/schema/getPosts.graphql'
import Sidebar from '@/components/organisms/Sidebar'
import {
  PostCardHorizontal,
  PostCardOverlay,
  PostCardVertical,
} from '@/components/molecules/PostCard'
import { useCallback, useState } from 'react'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Title from '@/components/molecules/Title'
import PageContent from '@/components/organisms/PageContent'
import { NextSeo } from 'next-seo'
import HomeHero from '@/components/organisms/HomeHero'
import Head from 'next/head'
import getSidebarData from '@/functions/getSidebarData'
import { loadMorePosts } from '@/functions/fetch/loadMorePosts'

export default function Page({ pageData, postsData, sidebarData }) {
  const { title, pageContent, seo } = pageData?.page ?? {}
  const { hero, content } = pageContent ?? {}
  const { metaDesc, opengraphDescription, schema } = seo ?? {}

  const { posts } = postsData ?? {}

  const [postList, setPostList] = useState(posts?.nodes?.slice(4, 10))
  const [hasNextPage, setHasNextPage] = useState(posts?.pageInfo?.hasNextPage)
  const [endCursor, setEndCursor] = useState(posts?.pageInfo?.endCursor)

  const { data, error } = loadMorePosts(endCursor)

  const loadMoreHandler = useCallback(() => {
    if (!error && data) {
      setPostList((currentPostList) => [
        ...currentPostList,
        ...data.posts.nodes,
      ])
      setHasNextPage(data.posts?.pageInfo.hasNextPage)
      setEndCursor(data.posts?.pageInfo.endCursor)
    }
  }, [error, data])

  return (
    <>
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: schema?.raw || '' }}
        />
      </Head>

      <Layout>
        <HomeHero post={posts?.nodes?.[0]} hero={hero} />

        <PageContent content={content} />

        <Container className={'py-20'}>
          <Title>
            <h3>{'Popular Posts'}</h3>
          </Title>

          <div className={'lg:grid lg:grid-cols-3 gap-12'}>
            <div className={'lg:col-span-2'}>
              <div className={'mb-4'}>
                <PostCardOverlay post={posts?.nodes?.[0]} />
              </div>

              <div className={'grid md:grid-cols-2 gap-4 mb-6'}>
                <PostCardVertical post={posts?.nodes?.[1]} />
                <PostCardVertical post={posts?.nodes?.[2]} />
              </div>

              {postList?.map((post, index) => (
                <PostCardHorizontal
                  key={index}
                  post={post}
                  className={'mb-6'}
                />
              ))}

              <div>
                <Button
                  size={'full'}
                  onClick={() => loadMoreHandler()}
                  disabled={!hasNextPage}
                  className={'my-12'}
                >
                  {'Load More'}
                </Button>
              </div>
            </div>

            <div className={'lg:col-span-1'}>
              <Sidebar data={sidebarData} />
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Page Content
   */
  const { data: pageData, pageError } = await client.query({
    query: GET_PAGE_QUERY,
    variables: {
      slug: '/',
    },
  })

  /**
   * Popular Posts
   */
  const { data: postsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 10,
      categoryNotIn: 49,
    },
  })

  if (pageError || !pageData?.page) {
    return {
      notFound: true,
    }
  }

  /**
   * Sidebar Data
   */
  const sidebarData = await getSidebarData()

  return {
    props: {
      pageData,
      postsData,
      sidebarData,
    },
    revalidate: 100,
  }
}
