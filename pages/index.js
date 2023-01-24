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
import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Title from '@/components/molecules/Title'
import PageContent from '@/components/organisms/PageContent'
import { NextSeo } from 'next-seo'
import HomeHero from '@/components/organisms/HomeHero'

export default function Page({ pageData, postsData }) {
  const { title, pageContent, seo } = pageData?.page ?? {}
  const { hero, content } = pageContent ?? {}
  const { metaDesc, opengraphDescription } = seo ?? {}

  const { posts } = postsData ?? {}

  const [postList, setPostList] = useState(posts?.nodes?.slice(4, 10))
  const [hasNextPage, setHasNextPage] = useState(posts?.pageInfo?.hasNextPage)
  const [endCursor, setEndCursor] = useState(posts?.pageInfo?.endCursor)

  async function loadMorePosts() {
    const { data: postsData, error } = await client.query({
      query: GET_POSTS_QUERY,
      variables: {
        first: 10,
        after: endCursor,
      },
    })

    if (!error) {
      setPostList([...postList, ...postsData.posts.nodes])
      setHasNextPage(postsData.posts?.pageInfo.hasNextPage)
      setEndCursor(postsData.posts?.pageInfo.endCursor)
    }
  }

  return (
    <>
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

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
                  onClick={() => loadMorePosts()}
                  disabled={!hasNextPage}
                  className={'my-12'}
                >
                  {'Load More'}
                </Button>
              </div>
            </div>

            <div className={'lg:col-span-1'}>
              <Sidebar />
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

  return {
    props: {
      pageData,
      postsData,
    },
    revalidate: 30,
  }
}
