import { client } from '@/lib/apollo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import GET_PAGE_SLUGS_QUERY from '@/const/schema/getPageSlugs.graphql'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'

export default function Page({ postString, category, posts }) {
  const post = postString?.length > 0 ? JSON.parse(postString) : {}

  return (
    <>
      <NextSeo
        title={post.fields?.seoTitle}
        description={post.fields?.seoDescription}
      />

      <Layout>
        {post && <Post post={post} category={category} posts={posts} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  /**
   * Page Content
   */
  const { data: pageData, pageError } = await client.query({
    query: GET_PAGE_QUERY,
    variables: {
      slug: params.slug,
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
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGE_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.pages.nodes.map((node) => ({
      params: node,
    })),
    fallback: 'blocking',
  }
}
