import { client } from '@/lib/apollo'
import GET_POST_QUERY from '@/const/schema/getPost.graphql'
import GET_POST_SLUGS_QUERY from '@/const/schema/getPostSlugs.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import HTMLReactParser from 'html-react-parser'
import PostContent from '@/components/organisms/PostContent'

export default function Post({ postData }) {
  const { contents } = postData?.post?.postContent ?? {}

  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Container>
          <Loading />
        </Container>
      </Layout>
    )
  }

  return (
    <Layout seo={HTMLReactParser(postData?.post?.seo?.fullHead)}>
      <PostContent contents={contents} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  /**
   * Post Content
   */
  const { data: postData, postError } = await client.query({
    query: GET_POST_QUERY,
    variables: {
      slug: params.slug,
    },
  })

  if (postError) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      postData,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_POST_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.posts.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
