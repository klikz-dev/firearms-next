import Container from '@/components/atoms/Container'
import Link from '@/components/atoms/Link'
import Layout from '@/components/common/Layout'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'
import Title from '@/components/molecules/Title'
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
      icon: <FontAwesomeIcon icon={faHomeAlt} className={'text-sm w-6'} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <FontAwesomeIcon icon={faShoppingBag} className={'text-sm w-6'} />,
      text: 'Prices',
    },
  ]

  const today = moment().format('MMMM YYYY')

  return (
    <>
      <NextSeo
        title={`Compare Prices on Guns & Accessories to Find the Best Deals`}
        description={`Compare prices on guns & accessories to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className='mb-12'>
            <h1 className='text-red-700 font-bold my-4'>
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
        </Container>

        <Container>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div>
              <div className='mb-16'>
                <Title>
                  <h2>Popular Handguns</h2>
                </Title>

                <PopularCategory pages={handgunsPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link
                    href='/shop/categories/popular/handguns/'
                    className={'text-red-700'}
                  >
                    Shop All Handguns
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className={`text-sm w-6`}
                    />
                  </Link>
                </div>
              </div>

              <div className='mb-16'>
                <Title>
                  <h2>Popular Rifles</h2>
                </Title>

                <PopularCategory pages={riflesPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link
                    href='/shop/categories/popular/rifles/'
                    className={'text-red-700'}
                  >
                    Shop All Rifles
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className={`text-sm w-6`}
                    />
                  </Link>
                </div>
              </div>

              <div className='mb-16'>
                <Title>
                  <h2>Popular Shotguns</h2>
                </Title>

                <PopularCategory pages={shotgunsPages} />

                <div className='flex justify-end mt-4 px-4'>
                  <Link
                    href='/shop/categories/popular/shotguns/'
                    className={'text-red-700'}
                  >
                    Shop All Shotguns
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className={`text-sm w-6`}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className='w-80'>
              <div className='shadow-lg rounded border border-zinc-200 p-6 lg:mt-48 mb-12'>
                <Title>
                  <h3>Top Brands</h3>
                </Title>

                {brands?.map((brand, index) => (
                  <Link
                    key={index}
                    href={`/shop/brands/popular/${brand.slug}`}
                    className='block capitalize hover:text-red-800 hover:underline mb-1'
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

              <div className='shadow-lg rounded border border-zinc-200 p-6'>
                <Title>
                  <h3>Top Categories</h3>
                </Title>

                {categories?.map((category, index) => (
                  <Link
                    key={index}
                    href={`/shop/brands/popular/${category.slug}`}
                    className='block capitalize hover:text-red-800 hover:underline mb-1'
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
