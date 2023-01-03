import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import Link from '@/components/atoms/Link'
import Layout from '@/components/common/Layout'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'
import PopularCategory from '@/components/organisms/Shop/Categories/Popular'
import {
  faArrowRightLong,
  faHomeAlt,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { NextSeo } from 'next-seo'

export default function Page({
  categories,
  brands,
  handgunsPages,
  riflesPages,
  shotgunsPages,
}) {
  const breadcrumbs = [
    {
      icon: <FontAwesomeIcon icon={faHomeAlt} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <FontAwesomeIcon icon={faShoppingBag} />,
      text: 'Prices',
      link: '/shop/',
    },
  ]

  const today = moment().calendar()

  return (
    <>
      <NextSeo
        title={`Compare Prices on Guns & Accessories to Find the Best Deals`}
        description={`Compare prices on guns & accessories to find the best deals before buying.`}
      />

      <Layout>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className='mb-12'>
            <h1 className='text-4xl text-red-700 font-bold my-4'>
              Most Popular Firearms in {today}
            </h1>

            <p className='text-lg'>
              Every month AmericanFirearms.org publishes the monthly Most
              Popular Report, highlighting the most popular guns in each major
              category. We partner with retailers, brands, manufacturers, and
              auction sites to algorithmically compile price and sales trends so
              you'll have up-to-date information on the most popular firearms
              available. Below are the most popular guns for {today}.
            </p>
          </div>

          <GradientBorder height={2} className={'w-96'} />
        </Container>

        <Container>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div>
              <div className='mb-16'>
                <h2 className='text-3xl font-bold mb-8'>Popular Handguns</h2>

                <PopularCategory pages={handgunsPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link href='/shop/categories/popular/handguns/'>
                    Shop All Handguns
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </Link>
                </div>
              </div>

              <div className='mb-16'>
                <h2 className='text-3xl font-bold mb-8'>Popular Rifles</h2>

                <PopularCategory pages={riflesPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link
                    href='/shop/categories/popular/rifles/'
                    className='flex text-blue-900 hover:text-blue-700 font-bold'
                  >
                    Shop All Rifles
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </Link>
                </div>
              </div>

              <div className='mb-16'>
                <h2 className='text-3xl font-bold mb-8'>Popular Shotguns</h2>

                <PopularCategory pages={shotgunsPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link
                    href='/shop/categories/popular/shotguns/'
                    className='flex text-blue-900 hover:text-blue-700 font-bold'
                  >
                    Shop All Shotguns
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </Link>
                </div>
              </div>
            </div>

            <div className='w-80'>
              <div className='shadow-lg rounded border border-zinc-200 p-6 lg:mt-48 mb-12'>
                <h3 className='text-2xl text-zinc-900 font-bold mb-4'>
                  Top Brands
                </h3>

                {brands?.map((brand, index) => (
                  <Link
                    key={index}
                    href={`/shop/brands/popular/${brand.slug}`}
                    className='block capitalize text-blue-900 hover:text-blue-700 hover:underline font-semibold mb-1'
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

              <div className='shadow-lg rounded border border-zinc-200 p-6'>
                <h3 className='text-2xl text-zinc-900 font-bold mb-4'>
                  Top Categories
                </h3>

                {categories?.map((category, index) => (
                  <Link
                    key={index}
                    href={`/shop/categories/popular/${category.slug}`}
                    className='block capitalize text-blue-900 hover:text-blue-700 hover:underline font-semibold mb-1'
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
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
      categories,
      brands,
      handgunsPages: handgunsPages?.slice(0, 10) || [],
      riflesPages: riflesPages?.slice(0, 10) || [],
      shotgunsPages: shotgunsPages?.slice(0, 10) || [],
    },
    revalidate: 10,
  }
}
