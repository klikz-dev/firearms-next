import { client } from '@/lib/apollo'
import GET_POST_QUERY from '@/const/schema/getPost.graphql'
import GET_POST_SLUGS_QUERY from '@/const/schema/getPostSlugs.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import PostContent from '@/components/organisms/PostContent'
import Sidebar from '@/components/organisms/Sidebar'
import GradientBorder from '@/components/atoms/GradientBorder'
import PostMeta from '@/components/molecules/PostMeta'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import HTMLContent from '@/components/atoms/HTMLContent'
import { NextSeo } from 'next-seo'

export default function Post({ postData }) {
  const {
    title,
    slug,
    seo,
    author,
    content,
    date,
    featuredImage,
    postContent,
  } = postData?.post ?? {}
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
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

      <Layout>
        <Container className={'pt-8 lg:pt-20 lg:grid lg:grid-cols-3 gap-12'}>
          <div className={'lg:col-span-2 mb-20'}>
            <h1>{title}</h1>

            <GradientBorder
              height={2}
              className={'w-96 max-w-full mt-4 mb-8'}
            />

            {metaDesc && <p className={'mt-4 mb-8'}>{metaDesc}</p>}

            <PostMeta title={title} slug={slug} author={author} date={date} />

            <div
              className={
                'mt-8 mb-8 p-4 bg-zinc-200 border-l-4 border-red-700 rounded-r-full'
              }
            >
              <p className='text-sm'>
                {
                  'Products are selected by our editors. We may earn a commission on purchases from a link. '
                }
                <Link
                  href={'/how-we-test-review-gear/'}
                  className={'text-red-600 font-sans underline'}
                >
                  {'How we select gear.'}
                </Link>
              </p>
            </div>

            <Image
              src={featuredImage?.node?.sourceUrl}
              alt={featuredImage?.node?.alt}
              width={featuredImage?.node?.mediaDetails?.width}
              height={featuredImage?.node?.mediaDetails?.height}
              priority={true}
            />

            <HTMLContent className={'py-8'}>{content}</HTMLContent>

            <PostContent contents={postContent?.contents} />
          </div>

          <div className={'lg:col-span-1'}>
            <Sidebar />
          </div>
        </Container>
      </Layout>
    </>
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

  if (postError || !postData?.post) {
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
      first: 99,
    },
  })

  return {
    paths: data.posts.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
