import { client } from '@/lib/apollo'
import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import Hero from '@/components/organisms/PageContent/Hero'
import LatestPosts from '@/components/organisms/PageContent/LatestPosts'
import TwoColImageText from '@/components/organisms/PageContent/TwoColImageText'
import IconGroup from '@/components/organisms/PageContent/IconGroup'

export default function Page({ pageData }) {
  const { content } = pageData?.page?.pageContent ?? {}

  return (
    <>
      <NextSeo
        title={`Firearm Prices, Ratings, Reviews, & News`}
        description={`Get your firearm fix with our unbiased gun & gear reviews. We go deep so you can get the right gear, learn more, and shoot better.`}
      />

      <Layout>
        {content?.map((section, index) => {
          switch (section?.__typename) {
            case 'Page_Pagecontent_Content_Hero':
              return <Hero key={index} {...section} />

            case 'Page_Pagecontent_Content_LatestPosts':
              return <LatestPosts key={index} {...section} />

            case 'Page_Pagecontent_Content_2ColImageText':
              return <TwoColImageText key={index} {...section} />

            case 'Page_Pagecontent_Content_IconGroup':
              return <IconGroup key={index} {...section} />

            default:
              return <div key={index}></div>
          }
        })}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Latest Posts
   */
  const { data: pageData, error } = await client.query({
    query: GET_PAGE_QUERY,
    variables: {
      slug: 'homepage',
    },
  })

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageData,
    },
    revalidate: 10,
  }
}
