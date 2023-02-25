import { client } from '@/lib/apollo'
import GET_CATEGORY_QUERY from '@/const/schema/getCategory.graphql'
import GET_CATEGORY_SLUGS_QUERY from '@/const/schema/getCategorySlugs.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import Title from '@/components/molecules/Title'
import { PostCardVertical } from '@/components/molecules/PostCard'
import { NextSeo } from 'next-seo'

export default function Category({ categoryData }) {
  const { name, description, seo, posts } = categoryData?.category ?? {}
  const { metaDesc, opengraphDescription } = seo ?? {}

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
    <>
      <NextSeo title={name} description={metaDesc || opengraphDescription} />

      <Layout>
        <Container className={'py-20'}>
          <Title>
            <h1>{name}</h1>
          </Title>

          <p className={'mb-8'}>{description}</p>

          <div className={'grid md:grid-cols-2 lg:grid-cols-4 gap-4'}>
            {posts?.nodes?.map((post, index) => (
              <div key={index}>
                <PostCardVertical post={post} priority={index < 8} />
              </div>
            ))}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  /**
   * Category
   */
  const { data: categoryData, error } = await client.query({
    query: GET_CATEGORY_QUERY,
    variables: {
      slug: params.slug,
    },
  })

  if (error || !categoryData?.category) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categoryData,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_CATEGORY_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.categories.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
