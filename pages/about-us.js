import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import PageContent from '@/components/organisms/PageContent'

export default function Page({ pageData }) {
  const { content } = pageData?.page?.pageContent ?? {}

  return (
    <>
      <NextSeo
        title={`Firearm Prices, Ratings, Reviews, & News`}
        description={`Get your firearm fix with our unbiased gun & gear reviews. We go deep so you can get the right gear, learn more, and shoot better.`}
      />

      <Layout>
        <PageContent content={content} />
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
      slug: 'about-us',
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
