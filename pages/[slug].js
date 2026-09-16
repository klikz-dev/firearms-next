import { client } from '@/lib/apollo'
import GET_POST_QUERY from '@/const/schema/getPost.graphql'
import GET_POST_SLUGS_QUERY from '@/const/schema/getPostSlugs.graphql'
import GET_AUTHOR_QUERY from '@/const/schema/getAuthor.graphql'
import GET_RELATED_POSTS_QUERY from '@/const/schema/getRelatedPosts.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import PostContent from '@/components/organisms/PostContent'
import Sidebar from '@/components/organisms/Sidebar'
import PostNav from '@/components/organisms/PostNav'
import MeetTheExperts from '@/components/organisms/MeetTheExperts'
import FurtherReading from '@/components/organisms/FurtherReading'
import GradientBorder from '@/components/atoms/GradientBorder'
import PostMeta from '@/components/molecules/PostMeta'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import HTMLContent from '@/components/atoms/HTMLContent'
import { NextSeo } from 'next-seo'
import moment from 'moment'
import Head from 'next/head'
import Script from 'next/script'
import getSidebarData from '@/functions/getSidebarData'
import filterSchema from '@/functions/filterSchema'
import getPicks from '@/functions/getPicks'
import convertToSlug from '@/functions/convertToSlug'
import { getAffiliateDestination } from '@/functions/acfOptions'

const EDITOR_SLUG = 'michael-crites'
const AMAZON_PATTERN = /amazon.|amzn.to/i

async function isAmazonCta({ buttonText, link }) {
  if (AMAZON_PATTERN.test(link ?? '') || /amazon/i.test(buttonText ?? '')) {
    return true
  }
  const destination = await getAffiliateDestination(link)
  return AMAZON_PATTERN.test(destination ?? '')
}

export default function Post({ post, michael, sidebarData, related, picks }) {
  const {
    title,
    slug,
    seo,
    author,
    content,
    featuredImage,
    date,
    modified,
    postContent,
  } = post ?? {}
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

  const experts = [
    author?.node && { author: author.node, headline: 'Written By' },
    michael &&
      author?.node?.slug !== EDITOR_SLUG && {
        author: michael,
        headline: 'Edited By',
      },
  ].filter(Boolean)

  const headings = (postContent?.contents ?? [])
    .filter((block) => block.__typename === 'Post_Postcontent_Contents_Heading')
    .map((block) => ({ id: convertToSlug(block.text), label: block.text }))

  const sections = [
    experts.length > 0 && { id: 'meet-the-experts', label: 'Meet the Experts' },
    headings.length > 0 && { id: 'in-this-article', label: 'In This Article' },
    ...headings,
    related?.posts?.length > 0 && {
      id: 'further-reading',
      label: 'Further Reading',
    },
  ].filter(Boolean)

  return (
    <>
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: filterSchema(schema?.raw) || '' }}
        />
      </Head>

      {/* Google "Add as preferred source" button, rendered in PostMeta */}
      <Script
        src='https://news.google.com/swg/js/v1/publisher.js'
        strategy='afterInteractive'
      />

      <Layout>
        <PostNav sections={sections} picks={picks ?? []} />

        <Container className={'pt-8 lg:pt-20 lg:grid lg:grid-cols-3 gap-12'}>
          <div className={'lg:col-span-2 mb-20'}>
            <h1>{title}</h1>

            <GradientBorder
              height={2}
              className={'w-96 max-w-full mt-4 mb-8'}
            />

            {metaDesc && <p className={'mt-4 mb-8'}>{metaDesc}</p>}

            <PostMeta
              title={title}
              slug={slug}
              author={author}
              michael={michael}
            />

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

            <div className={'relative mb-10'}>
              <Image
                src={featuredImage?.node?.sourceUrl}
                alt={featuredImage?.node?.alt}
                width={featuredImage?.node?.mediaDetails?.width}
                height={featuredImage?.node?.mediaDetails?.height}
                priority={true}
              />

              <div
                className={
                  'absolute left-10 -bottom-10 w-20 h-20 text-center bg-red-600 rounded-full text-white flex flex-col justify-center'
                }
              >
                <p className={'text-sm font-bold'}>
                  {moment(date) === moment(modified) ? 'Published' : 'Updated'}
                </p>
                <p className='text-xs'>{moment(modified).format('MMM YYYY')}</p>
              </div>
            </div>

            <HTMLContent className={'py-8'}>{content}</HTMLContent>

            <MeetTheExperts experts={experts} />

            <PostContent contents={postContent?.contents} />

            <FurtherReading
              posts={related?.posts ?? []}
              category={related?.category}
            />
          </div>

          <div className={'lg:col-span-1'}>
            <Sidebar
              alert={postContent?.alert}
              data={sidebarData}
              picks={picks ?? []}
            />
          </div>
        </Container>
      </Layout>
    </>
  )
}

function buildAmazonLink({ productId, link }) {
  const override = link?.trim()
  if (override) return override

  const asin = productId?.trim()
  if (!asin) return null

  const tag = process.env.AMAZON_PARTNER_TAG
  return `https://www.amazon.com/dp/${encodeURIComponent(asin)}/${
    tag ? `?tag=${encodeURIComponent(tag)}` : ''
  }`
}

async function getRelatedPosts(post) {
  const category = post?.categories?.nodes?.[0]
  if (!category?.slug) return { category: null, posts: [] }

  try {
    const { data } = await client.query({
      query: GET_RELATED_POSTS_QUERY,
      variables: { first: 7, category: category.slug },
    })

    return {
      category: category.name ?? null,
      posts: (data?.posts?.nodes ?? [])
        .filter((node) => node.slug !== post.slug)
        .slice(0, 6),
    }
  } catch (error) {
    console.error(`[related] lookup failed for ${post.slug}`, error)
    return { category: category.name ?? null, posts: [] }
  }
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

  const updatedPost = { ...postData.post }
  if (postData?.post?.postContent?.contents) {
    const { contents } = postData.post.postContent
    const updatedContents = await Promise.all(
      contents.map(async (content) => {
        if (content.__typename === 'Post_Postcontent_Contents_Cta') {
          // CTAs that send the reader to Amazon get no "Other Sellers" row
          const isAmazon = await isAmazonCta(content)
          try {
            const page = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/${content.productSlug}`
            )
            const pageData = await page.json()
            if (pageData) {
              return { ...content, page: pageData, isAmazon }
            }
          } catch (error) {
            console.error(`[cta] page lookup failed for ${content.productSlug}`)
          }
          return { ...content, isAmazon }
        }

        if (content.__typename === 'Post_Postcontent_Contents_AmazonProduct') {
          return { ...content, amazonLink: buildAmazonLink(content) }
        }

        return { ...content }
      })
    )

    updatedPost.postContent = {
      ...updatedPost.postContent,
      contents: updatedContents,
    }
  }

  const picks = getPicks(updatedPost.postContent?.contents ?? [])

  /**
   * Main Author - Michael
   */
  const { data: authorData } = await client.query({
    query: GET_AUTHOR_QUERY,
    variables: {
      slug: EDITOR_SLUG,
    },
  })

  /**
   * Further reading
   */
  const related = await getRelatedPosts(updatedPost)

  /**
   * Sidebar Data - only needed when the post has no CTAs, otherwise the
   * sticky "Our Top Picks" rail replaces the newsletter and category blocks.
   */
  const sidebarData = picks.length ? null : await getSidebarData()

  return {
    props: {
      post: updatedPost,
      michael: authorData?.user ?? null,
      sidebarData,
      related,
      picks,
    },
    revalidate: 100,
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
      params: { slug: node.slug },
    })),
    fallback: true,
  }
}
