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
import Head from 'next/head'
import getSidebarData from '@/functions/getSidebarData'
import filterSchema from '@/functions/filterSchema'

export default function Page({ pageData, sidebarData }) {
  const { title, pageContent, seo } = pageData?.page ?? {}
  const { layout, hero, content } = pageContent ?? {}
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

      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: filterSchema(schema?.raw) || '' }}
        />
      </Head>

      <Layout>
        <Hero {...hero} />

        {layout === 'full' && <PageContent content={content} />}

        {layout === 'sidebar' && (
          <div className={'max-w-7xl mx-auto grid lg:grid-cols-3 gap-16'}>
            <div className={'lg:col-span-2'}>
              <PageContent content={content} />
            </div>
            <div className={'lg:col-span-1 pt-20'}>
              <Sidebar data={sidebarData} />
            </div>
          </div>
        )}

        {layout === 'toc' && (
          <div
            className={
              'max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16'
            }
          >
            <div className={'w-full lg:w-2/3'}>
              <PageContent content={content} />
            </div>
            <div className={'w-full lg:w-1/3 lg:pt-20 px-4'}>
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
      slug: 'firearm-basics',
    },
  })

  if (pageError || !pageData?.page) {
    return {
      notFound: true,
    }
  }

  /**
   * Sidebar Data
   */
  const sidebarData = await getSidebarData()

  return {
    props: {
      pageData,
      sidebarData,
    },
    revalidate: 100,
  }
}
