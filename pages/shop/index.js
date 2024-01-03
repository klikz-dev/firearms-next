import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Link from '@/components/atoms/Link'
import Layout from '@/components/common/Layout'
import Title from '@/components/molecules/Title'
import Hero from '@/components/organisms/PageContent/Hero'
import PopularCategory from '@/components/organisms/Shop/Categories/Popular'
import moment from 'moment'
import { NextSeo } from 'next-seo'
import { client } from '@/lib/apollo'
import GET_PAGE_QUERY from '@/const/schema/getPage.graphql'
import PageContent from '@/components/organisms/PageContent'
import Head from 'next/head'

export default function Page({
  pageData,
  handgunsPages,
  riflesPages,
  shotgunsPages,
}) {
  const { title, pageContent, seo } = pageData?.page ?? {}
  const { hero, content } = pageContent ?? {}
  const { metaDesc, opengraphDescription, schema } = seo ?? {}

  const today = moment().format('MMMM YYYY')

  return (
    <>
      <NextSeo title={title} description={metaDesc || opengraphDescription} />

      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: schema?.raw || '' }}
        />
      </Head>

      <Layout>
        <Hero {...hero} />

        <Container className={`py-16`}>
          <div className='text-center'>
            <Title>
              <h1>Most Popular Firearms in {today}</h1>
            </Title>

            <p className='text-lg'>
              Every month AmericanFirearms.org publishes the monthly Most
              Popular Report, highlighting the most popular guns in each major
              category. We partner with retailers, brands, manufacturers, and
              auction sites to algorithmically compile price and sales trends so
              you'll have up-to-date information on the most popular firearms
              available. Below are the most popular guns for {today}.
            </p>
          </div>
        </Container>

        <div className={'py-16 bg-zinc-100'}>
          <Container>
            <Title>
              <h2>Popular Handguns</h2>
            </Title>

            <PopularCategory pages={handgunsPages} />

            <div className='flex justify-center mt-4 px-4'>
              <Link href='/shop/categories/popular/handguns/'>
                <Button color={'red'}>Shop All</Button>
              </Link>
            </div>
          </Container>
        </div>

        <div className={'py-16 bg-white'}>
          <Container>
            <Title>
              <h2>Popular Rifles</h2>
            </Title>

            <PopularCategory pages={riflesPages} />

            <div className='flex justify-center mt-4 px-4'>
              <Link href='/shop/categories/popular/rifles/'>
                <Button color={'red'}>Shop All</Button>
              </Link>
            </div>
          </Container>
        </div>

        <div className={'py-16 bg-zinc-100'}>
          <Container>
            <Title>
              <h2>Popular Shotguns</h2>
            </Title>

            <PopularCategory pages={shotgunsPages} />

            <div className='flex justify-center mt-4 px-4'>
              <Link href='/shop/categories/popular/shotguns/'>
                <Button color={'red'}>Shop All</Button>
              </Link>
            </div>
          </Container>
        </div>

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
      slug: 'shop',
    },
  })

  if (pageError || !pageData?.page) {
    return {
      notFound: true,
    }
  }

  /**
   * Top Categories
   */
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/`
  )
  const { results: categories } = await categoriesRes.json()

  /**
   * Top Brands
   */
  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/`
  )
  const { results: brands } = await brandsRes.json()

  /**
   * Handguns
   */
  const handgunsPagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=handguns`
  )
  const { results: handgunsPages } = await handgunsPagesRes.json()

  /**
   * Rifles
   */
  const riflesPagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=rifles`
  )
  const { results: riflesPages } = await riflesPagesRes.json()

  /**
   * Shotguns
   */
  const shotgunsPagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=shotguns`
  )
  const { results: shotgunsPages } = await shotgunsPagesRes.json()

  return {
    props: {
      pageData,
      categories,
      brands,
      handgunsPages: handgunsPages?.slice(0, 10) || [],
      riflesPages: riflesPages?.slice(0, 10) || [],
      shotgunsPages: shotgunsPages?.slice(0, 10) || [],
    },
    revalidate: 100,
  }
}
