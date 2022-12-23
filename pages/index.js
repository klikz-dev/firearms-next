import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
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

export default function Page({ pageData, postsData }) {
  const { content } = pageData?.page?.pageContent ?? {}
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
      <NextSeo
        title={`Firearm Prices, Ratings, Reviews, & News`}
        description={`Get your firearm fix with our unbiased gun & gear reviews. We go deep so you can get the right gear, learn more, and shoot better.`}
      />

      <Layout>
        <PageContent content={content} />

        <Container className={'py-20'}>
          <Title>
            <h3>{'Popular Posts'}</h3>
          </Title>

          <div className={'grid grid-cols-3 gap-12'}>
            <div className={'col-span-2'}>
              <div className={'mb-4'}>
                <PostCardOverlay post={posts?.nodes?.[0]} />
              </div>

              <div className={'grid grid-cols-2 gap-4 mb-6'}>
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

            <div className={'col-span-1'}>
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
      slug: 'homepage',
    },
  })

  /**
   * Popular Posts
   */
  const { data: postsData } = await client.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: 10,
    },
  })

  if (pageError) {
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
