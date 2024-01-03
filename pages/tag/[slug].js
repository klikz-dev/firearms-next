import { client } from '@/lib/apollo'
import GET_TAG_QUERY from '@/const/schema/getTag.graphql'
import GET_TAG_SLUGS_QUERY from '@/const/schema/getTagSlugs.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import Title from '@/components/molecules/Title'
import { PostCardVertical } from '@/components/molecules/PostCard'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

export default function Tag({ tagData }) {
  const { name, description, seo, posts } = tagData?.tag ?? {}
  const { metaDesc, opengraphDescription, schema } = seo ?? {}

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

      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: schema?.raw || '' }}
        />
      </Head>

      <Layout>
        <Container className={'py-20'}>
          <Title>
            <h1>{name}</h1>
          </Title>

          <p className={'max-w-sm my-6'}>{description}</p>

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
   * Tag
   */
  const { data: tagData, error } = await client.query({
    query: GET_TAG_QUERY,
    variables: {
      slug: params.slug,
    },
  })

  if (error || !tagData?.tag) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tagData: tagData,
    },
    revalidate: 100,
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_TAG_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.tags.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
