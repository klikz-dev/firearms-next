import { client } from '@/lib/apollo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import GET_PAGE_SLUGS_QUERY from '@/const/schema/getPageSlugs.graphql'
import Layout from '@/components/common/Layout'
import PageContent from '@/components/organisms/PageContent'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import Loading from '@/components/atoms/Loading'
import HTMLReactParser from 'html-react-parser'

export default function Page({ pageData }) {
  const { content } = pageData?.page?.pageContent ?? {}

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
    <Layout seo={HTMLReactParser(pageData?.page?.seo?.fullHead)}>
      <PageContent content={content} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  /**
   * Page Content
   */
  const { data: pageData, pageError } = await client.query({
    query: GET_PAGE_QUERY,
    variables: {
      slug: params.slug,
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

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGE_SLUGS_QUERY,
    variables: {
      first: 100,
    },
  })

  return {
    paths: data.pages.nodes.map((node) => ({
      params: node,
    })),
    fallback: true,
  }
}
