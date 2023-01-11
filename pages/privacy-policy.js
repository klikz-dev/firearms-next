import { client } from '@/lib/apollo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import Layout from '@/components/common/Layout'
import PageContent from '@/components/organisms/PageContent'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import Sidebar from '@/components/organisms/Sidebar'
import Hero from '@/components/organisms/PageContent/Hero'
import TOCNav from '@/components/organisms/TOCNav'
import convertToSlug from '@/functions/convertToSlug'
import { NextSeo } from 'next-seo'

export default function Page({ pageData }) {
  const { title, pageContent, seo } = pageData?.page ?? {}
  const { layout, hero, content } = pageContent ?? {}
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

  const toc_items = content
    ?.filter(
      (item) => item.__typename === 'Page_Pagecontent_Content_CategorySection'
    )
    ?.map((item) => {
      return { id: convertToSlug(item.title), label: item.title }
    })

  return (
    <>
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

      <Layout>
        <Hero {...hero} />

        {layout === 'full' && <PageContent content={content} />}

        {layout === 'sidebar' && (
          <div className={'max-w-7xl mx-auto grid grid-cols-3 gap-16'}>
            <div className={'col-span-2'}>
              <PageContent content={content} />
            </div>
            <div className={'col-span-1 pt-20'}>
              <Sidebar />
            </div>
          </div>
        )}

        {layout === 'toc' && (
          <div className={'max-w-7xl mx-auto grid grid-cols-3 gap-16'}>
            <div className={'col-span-2'}>
              <PageContent content={content} />
            </div>
            <div className={'col-span-1 pt-20'}>
              {toc_items?.length > 0 && <TOCNav toc_items={toc_items} />}
            </div>
          </div>
        )}
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
      slug: 'privacy-policy',
    },
  })

  if (pageError || !pageData?.page) {
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
