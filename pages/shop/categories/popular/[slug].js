import Layout from '@/components/common/Layout'
import PopularCategory from '@/components/organisms/Shop/Categories/Popular'
import { NextSeo } from 'next-seo'
import { findBestMatch } from 'string-similarity'
import Link from '@/components/atoms/Link'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import toCapitalize from '@/functions/toCapitalize'
import moment from 'moment'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'
import Title from '@/components/molecules/Title'

export default function Page({ category, pages, relatedCategories }) {
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

  const breadcrumbs = [
    {
      icon: <FontAwesomeIcon icon={faHomeAlt} className={'text-sm w-6'} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <FontAwesomeIcon icon={faShoppingBag} className={'text-sm w-6'} />,
      text: 'Prices',
      link: '/shop/',
    },
    { text: toCapitalize(category.name) },
  ]

  const today = moment().format('MMMM YYYY')

  return (
    <>
      <NextSeo
        title={`Top ${pages.length} Most Popular ${toCapitalize(
          category.name
        )} in ${today}`}
        description={`Compare prices on ${toCapitalize(
          category.name
        )} to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Title className={'mt-4 mb-8'}>
            <h1>
              The Top {pages.length} Most Popular {category.name} in {today}
            </h1>
          </Title>

          <p className='text-lg'>
            Every month AmericanFirearms.org publishes the monthly Most Popular{' '}
            {category.name} Report, highlighting the {pages.length} most popular{' '}
            {category.name} in that month. We partner with retailers, brands,
            manufacturers, and auction sites to algorithmically compile price
            and sales trends so you'll have up-to-date information on the most
            popular {category.name} available. Below are the most popular{' '}
            {category.name} for {today}.
          </p>
        </Container>

        <Container className={`py-12`}>
          <PopularCategory pages={pages} />
        </Container>

        <Container className={`py-12`}>
          <div className='shadow-lg rounded border border-zinc-100 p-6'>
            <Title>
              <h3>More Most Popular Lists</h3>
            </Title>

            <div className='grid md:grid-cols-2'>
              {relatedCategories?.map((category, index) => (
                <Link
                  key={index}
                  href={`/shop/categories/popular/${category.slug}`}
                  className='block capitalize text-blue-900 hover:text-blue-700 hover:underline font-semibold mb-1'
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    /**
     * Category
     */
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${params.slug}/`
    )
    // if (categoryRes.status !== 200) {
    //   return {
    //     notFound: true,
    //   }
    // }

    const category = await categoryRes.json()
    // if (!category) {
    //   return {
    //     notFound: true,
    //   }
    // }

    /**
     * Related Category Slugs
     */
    const categoriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/?limit=100&offset=0`
    )
    const categories = await categoriesRes.json()

    // Rank categories
    const relatedCategorySlugs = []
    const matches = findBestMatch(
      params.slug,
      categories?.results?.map((category) => category.slug)
    )
    matches.ratings
      .sort((a, b) => (a.rating > b.rating ? -1 : 1))
      .slice(0, 10)
      .map((slug) => relatedCategorySlugs.push(slug.target))

    const relatedCategories = categories?.results?.filter((category) =>
      relatedCategorySlugs.includes(category.slug)
    )

    /**
     * Pages
     */
    const pagesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=${params.slug}&limit=100&offset=0`
    )
    const { results: pages } = await pagesRes.json()

    return {
      props: {
        category,
        pages,
        relatedCategories,
      },
      revalidate: 1000,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
      revalidate: 5,
    }
  }
}

export async function getStaticPaths() {
  /**
   * Categories
   */
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category-slugs/`
  )
  const categories = await categoriesRes.json()

  return {
    paths: categories.results
      .filter((category) => category.slug)
      .map((category) => ({
        params: { slug: category.slug },
      })),
    fallback: true,
  }
}
