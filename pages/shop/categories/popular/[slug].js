import Layout from '@/components/common/Layout'
import PopularCategory from '@/components/organisms/Shop/Categories/Popular'
import { NextSeo } from 'next-seo'
import dateFormat from 'dateformat'
import { findBestMatch } from 'string-similarity'
import { HomeIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import Section from '@/components/atoms/Section'
import Divider from '@/components/atoms/Divider'
import Link from '@/components/atoms/Link'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import toCapitalize from '@/functions/toCapitalize'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'

export default function Page({ category, pages, relatedCategories }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Section>
          <Loading></Loading>
        </Section>
      </Layout>
    )
  }

  const breadcrumbs = [
    {
      icon: <HomeIcon width={20} className='text-blue-900' />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <ShoppingBagIcon width={20} className='text-blue-900' />,
      text: 'Prices',
      link: '/shop/',
    },
    { text: toCapitalize(category.name) },
  ]

  const today = dateFormat(new Date(), 'mmmm yyyy')

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
        <Section>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className='grid lg:grid-cols-3 gap-8 lg:gap-16 mb-12'>
            <div className='lg:col-span-2'>
              <h1 className='text-4xl text-red-700 font-bold my-4'>
                Most Popular {category.name} in {today}
              </h1>

              <p className='text-lg'>
                Every month AmericanFirearms.org publishes the monthly Most
                Popular {category.name} Report, highlighting the {pages.length}{' '}
                most popular {category.name} in that month. We partner with
                retailers, brands, manufacturers, and auction sites to
                algorithmically compile price and sales trends so you'll have
                up-to-date information on the most popular {category.name}{' '}
                available. Below are the most popular {category.name} for{' '}
                {today}.
              </p>
            </div>
          </div>

          <Divider />
        </Section>

        <Section>
          <h2 className='text-3xl font-bold mb-8'>
            The Top {pages.length} Most Popular {category.name} in {today}
          </h2>

          <PopularCategory pages={pages} />
        </Section>

        <Section>
          <div className='shadow-lg rounded border border-zinc-100 p-6'>
            <h3 className='text-2xl text-zinc-900 font-bold mb-4'>
              More Most Popular Lists
            </h3>

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
        </Section>
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
