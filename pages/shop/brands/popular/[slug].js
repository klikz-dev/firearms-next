import Layout from '@/components/common/Layout'
import PopularBrand from '@/components/organisms/Shop/Brands/Popular'
import { NextSeo } from 'next-seo'
import dateFormat from 'dateformat'
import { findBestMatch } from 'string-similarity'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Section from '@/components/atoms/Section'
import Divider from '@/components/atoms/Divider'
import Link from '@/components/atoms/Link'
import { HomeIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import toCapitalize from '@/functions/toCapitalize'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'

export default function Page({ brand, pages, relatedBrands }) {
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
    { text: toCapitalize(brand.name) },
  ]

  const today = dateFormat(new Date(), 'mmmm yyyy')

  return (
    <>
      <NextSeo
        title={`Top ${pages.length} Most Popular ${toCapitalize(
          brand.name
        )} Products in ${today}`}
        description={`Compare prices on ${toCapitalize(
          brand.name
        )} products to find the best deals before buying.`}
      />

      <Layout>
        <Section>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className='grid lg:grid-cols-3 gap-8 lg:gap-16 mb-12'>
            <div className='lg:col-span-2'>
              <h1 className='text-4xl text-red-700 font-bold my-4'>
                Most Popular {brand.name} Products in {today}
              </h1>

              <p className='text-lg'>
                Every month AmericanFirearms.org publishes the monthly Most
                Popular {brand.name} Report, highlighting the {pages.length}{' '}
                most popular {brand.name} in month. We partner with retailers,
                brands, manufacturers, and auction sites to algorithmically
                compile price and sales trends so you'll have up-to-date
                information on the most popular {brand.name} available. Below
                are the most popular {brand.name} for {today}.
              </p>
            </div>
          </div>

          <Divider />
        </Section>

        <Section>
          <h2 className='text-3xl font-bold mb-8'>
            The Top {pages.length} Most Popular {brand.name} Products in {today}
          </h2>

          <PopularBrand pages={pages} />
        </Section>

        <Section>
          <div className='shadow-lg rounded border border-zinc-100 p-6'>
            <h3 className='text-2xl text-zinc-900 font-bold mb-4'>
              More Popular Brands
            </h3>

            <div className='grid md:grid-cols-2'>
              {relatedBrands?.map((brand, index) => (
                <Link
                  key={index}
                  href={`/shop/brands/popular/${brand.slug}`}
                  className='block capitalize text-blue-900 hover:text-blue-700 hover:underline font-semibold mb-1'
                >
                  {brand.name}
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
     * Brand
     */
    const brandRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/${params.slug}/`
    )
    // if (brandRes.status !== 200) {
    //   return {
    //     notFound: true,
    //   }
    // }

    const brand = await brandRes.json()
    // if (!brand) {
    //   return {
    //     notFound: true,
    //   }
    // }

    /**
     * Related Brand Slugs
     */
    const brandsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/?limit=100&offset=0`
    )
    const brands = await brandsRes.json()

    // Rank brands
    const relatedBrandSlugs = []
    const matches = findBestMatch(
      params.slug,
      brands?.results?.map((brand) => brand.slug)
    )
    matches.ratings
      .sort((a, b) => (a.rating > b.rating ? -1 : 1))
      .slice(0, 10)
      .map((slug) => relatedBrandSlugs.push(slug.target))

    const relatedBrands = brands?.results?.filter((brand) =>
      relatedBrandSlugs.includes(brand.slug)
    )

    /**
     * Pages
     */
    const pagesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?brand=${params.slug}&limit=100&offset=0`
    )
    const { results: pages } = await pagesRes.json()

    return {
      props: {
        brand,
        pages,
        relatedBrands,
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
   * Brands
   */
  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brand-slugs/`
  )
  const brands = await brandsRes.json()

  return {
    paths: brands.results
      .filter((brand) => brand.slug)
      .map((brand) => ({
        params: { slug: brand.slug },
      })),
    fallback: true,
  }
}
