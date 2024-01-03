import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Layout from '@/components/common/Layout'
import Loading from '@/components/atoms/Loading'
import { PostCardHorizontal } from '@/components/molecules/PostCard'
import Search from '@/components/molecules/Search'
import { getSearchResults } from '@/functions/fetch/search'

export default function SearchComponent() {
  const router = useRouter()
  const { q } = router.query

  const { data, loading } = getSearchResults(q)

  const posts = data?.posts?.nodes ?? []

  if (loading) {
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
      <NextSeo title={`Search Results for: ${q}`} />

      <Layout>
        <Container>
          {q ? (
            <div className={'mb-12'}>
              <h1 className='text-3xl font-bold my-12 text-center'>
                Search Results for: <span className='text-red-700'>{q}</span>
              </h1>

              {posts?.length > 0 ? (
                <div className='grid lg:grid-cols-2 gap-8'>
                  {posts.map((post, index) => (
                    <PostCardHorizontal key={index} post={post} />
                  ))}
                </div>
              ) : (
                <div>
                  <h5 className='text-center mb-8'>
                    It seems we can't find what you're looking for.
                  </h5>

                  <Search />
                </div>
              )}
            </div>
          ) : (
            <>
              <h1 className='my-12 text-center'>Search</h1>

              <Search />
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
