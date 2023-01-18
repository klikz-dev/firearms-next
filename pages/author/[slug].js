import { client } from '@/lib/apollo'
import GET_AUTHOR_QUERY from '@/const/schema/getAuthor.graphql'
import GET_AUTHOR_SLUGS_QUERY from '@/const/schema/getAuthorSlugs.graphql'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import { PostCardVertical } from '@/components/molecules/PostCard'
import { NextSeo } from 'next-seo'
import classNames from 'classnames'
import GradientBorder from '@/components/atoms/GradientBorder'
import HTMLContent from '@/components/atoms/HTMLContent'
import Link from '@/components/atoms/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from '@/components/atoms/Image'

export default function Author({ authorData }) {
  const { name, description, author, posts } = authorData?.user ?? {}

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
      <NextSeo title={name} description={description} />

      <Layout>
        <Container className={'py-20'}>
          <div
            className={classNames(
              `flex gap-8 lg:gap-32 justify-between items-center mb-12 flex-col-reverse lg:flex-row-reverse`
            )}
          >
            <div className={'lg:w-2/3'}>
              <h2 className={'mb-1'}>{name}</h2>

              <p>{author.position}</p>

              <GradientBorder height={2} className={'w-40 my-4'} />

              <HTMLContent>{description}</HTMLContent>

              <div className={'flex flex-row gap-2 mt-4'}>
                {author?.facebook && (
                  <Link
                    href={author?.facebook}
                    className={
                      'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className={'text-red-700'}
                    />
                  </Link>
                )}
                {author?.twitter && (
                  <Link
                    href={author?.twitter}
                    className={
                      'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className={'text-red-700'}
                    />
                  </Link>
                )}
              </div>
            </div>

            <div
              className={'lg:w-1/3 flex flex-row justify-center items-center'}
            >
              <div className='w-60 h-60 rounded-full overflow-hidden relative'>
                <Image
                  src={author?.image?.sourceUrl}
                  alt={author?.image?.altText}
                  fill={true}
                  className={'object-cover'}
                />
              </div>
            </div>
          </div>

          <GradientBorder height={2} className={'w-full my-12'} />

          <div className={'grid md:grid-cols-2 lg:grid-cols-4 gap-4'}>
            {posts?.nodes?.map((post, index) => (
              <div key={index}>
                <PostCardVertical post={post} />
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
  const { data: authorData, error } = await client.query({
    query: GET_AUTHOR_QUERY,
    variables: {
      slug: params.slug,
    },
  })

  if (error || !authorData?.user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      authorData,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_AUTHOR_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.users.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
