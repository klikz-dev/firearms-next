import Layout from '@/components/common/Layout'
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
import PopularBrand from '@/components/organisms/Shop/Brands/Popular/Popular'

export default function Page({ brand, pages, relatedBrands }) {
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
    { text: toCapitalize(brand.name) },
  ]

  const today = moment().format('MMMM YYYY')

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
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Title className={'mt-4 mb-8'}>
            <h1>
              The Top {pages.length} Most Popular {brand.name} Products in{' '}
              {today}
            </h1>
          </Title>

          <p className='text-lg'>
            Every month AmericanFirearms.org publishes the monthly Most Popular{' '}
            {brand.name} Report, highlighting the {pages.length} most popular{' '}
            {brand.name} in month. We partner with retailers, brands,
            manufacturers, and auction sites to algorithmically compile price
            and sales trends so you'll have up-to-date information on the most
            popular {brand.name} available. Below are the most popular{' '}
            {brand.name} for {today}.
          </p>
        </Container>

        <Container className={`py-12`}>
          <PopularBrand pages={pages} />
        </Container>

        <Container className={`py-12`}>
          <div className='shadow-lg rounded border border-zinc-200 p-6'>
            <Title>
              <h3>More Popular Brands</h3>
            </Title>

            <div className='grid md:grid-cols-2'>
              {relatedBrands?.map((brand, index) => (
                <Link
                  key={index}
                  href={`/shop/brands/popular/${brand.slug}`}
                  className='block capitalize text-red-700 hover:text-red-800 hover:underline mb-1'
                >
                  {brand.name}
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
