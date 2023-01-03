import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import { findBestMatch } from 'string-similarity'
import toCapitalize from '@/functions/toCapitalize'
import Description from '@/components/organisms/Shop/Page/Description'
import getRank from '@/functions/getRank'
import getStats from '@/functions/getStats'
import MainProduct from '@/components/organisms/Shop/Page/MainProduct'
import Awards from '@/components/organisms/Shop/Page/Awards'
import Stats from '@/components/organisms/Shop/Page/Stats'
import Ranking from '@/components/organisms/Shop/Page/Ranking'
import MoreEssentials from '@/components/organisms/Shop/Page/MoreEssentials'
import Estimate from '@/components/organisms/Shop/Page/Estimate'
import getPriceEstimates from '@/functions/getPriceEstimates'
import Cost from '@/components/organisms/Shop/Page/Cost'
import getCosts from '@/functions/getCosts'
import TrendChart from '@/components/organisms/Shop/Page/TrendChart'
import OtherProducts from '@/components/organisms/Shop/Page/OtherProducts'
import MorePrices from '@/components/organisms/Shop/Page/MorePrices'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'

export default function Page({
  page,
  product,
  products,
  categoryPages,
  brandPages,
  relatedCategories,
}) {
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
    {
      text: toCapitalize(page.category.name),
      link: `/shop/categories/popular/${page.category.slug}`,
    },
    {
      text: toCapitalize(page.title),
    },
  ]

  /**
   * Related Pages
   */
  const relatedPageSlugs = []
  const matches = findBestMatch(
    router?.query?.slug,
    categoryPages?.map((page) => page.slug)
  )
  matches.ratings
    .sort((a, b) => (a.rating > b.rating ? -1 : 1))
    .slice(0, 15)
    .map((rate) => relatedPageSlugs.push(rate.target))

  const relatedPages = categoryPages?.filter((page) =>
    relatedPageSlugs.includes(page.slug)
  )

  const today = moment().format('MMMM YYYY')

  const pageStats = getStats(page.brand, page.category)
  const categoryRank = getRank(page, categoryPages)
  const brandRank = getRank(page, brandPages)
  const estimates = getPriceEstimates(product) || {}
  const costs = getCosts(products)

  return (
    <>
      <NextSeo
        title={`${toCapitalize(page.title)} Best Price: $${
          product.sale_price
        } - Price Trends for ${today}`}
        description={`Compare prices on ${toCapitalize(
          page.title
        )} to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className='flex flex-col lg:flex-row gap-12'>
            <div className='mb-8'>
              <h1 className='text-4xl text-red-700 font-bold my-4'>
                Best Price on {toCapitalize(page.title)}
              </h1>

              {product && <MainProduct product={product} />}

              <div className='block lg:hidden'>
                {page && (
                  <Awards
                    page={page}
                    brandRank={brandRank}
                    categoryRank={categoryRank}
                  />
                )}

                {pageStats.showStats && page && (
                  <Stats
                    header={`${toCapitalize(page?.title)} Stats`}
                    pageStats={pageStats}
                  />
                )}
              </div>

              {page && product && (
                <Description
                  title={page.title}
                  description={page.description || product.long_description}
                />
              )}

              {estimates && <Estimate estimates={estimates} />}

              {costs && <Cost page={page} costs={costs} />}

              {page && estimates && <TrendChart page={page} {...estimates} />}

              {page && products && product && (
                <OtherProducts
                  page={page}
                  products={products
                    .filter((p) => product.sku !== p.sku)
                    .slice(0, 5)}
                  product={product}
                />
              )}
            </div>

            <div className='w-full lg:w-80 flex-shrink-0'>
              <div className='hidden lg:block'>
                {page && (
                  <Awards
                    page={page}
                    brandRank={brandRank}
                    categoryRank={categoryRank}
                  />
                )}

                {pageStats.showStats && page && (
                  <Stats
                    header={`${toCapitalize(page.title)} Stats`}
                    pageStats={pageStats}
                  />
                )}
              </div>

              {page && brandPages && categoryPages && (
                <Ranking
                  page={page}
                  brandPages={brandPages}
                  categoryPages={categoryPages}
                />
              )}

              <MoreEssentials relatedCategories={relatedCategories} />

              {page && (
                <MorePrices
                  category={page.category}
                  relatedPages={relatedPages}
                />
              )}
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
     * Page
     */
    const pageRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/${params.slug}/`
    )
    const page = await pageRes.json()

    /**
     * Best Product
     */
    const products = page.product
      ?.sort((a, b) => (a.sale_price > b.sale_price ? 1 : -1))
      .filter((p) => !p.sku.includes('.') && !p.sku.includes('/'))

    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${products[0]?.sku}`
    )
    const product = await productRes.json()

    /**
     * Category Pages
     */
    const categoryPagesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=${page.category.slug}`
    )
    const { results: categoryPages } = await categoryPagesRes.json()

    /**
     * Brand Pages
     */
    const brandPagesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=${page.category.slug}&brand=${page.brand.slug}`
    )
    const { results: brandPages } = await brandPagesRes.json()

    /**
     * Related Category Slugs
     */
    const categoriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/?limit=10&offset=0`
    )
    const categories = await categoriesRes.json()
    const relatedCategories = categories.results?.filter(
      (category) => category && category.slug !== 'general'
    )

    return {
      props: {
        page,
        product,
        products,
        categoryPages,
        brandPages,
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
   * Pages
   */
  const pagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/page-slugs/?limit=100`
  )
  const { results: pages } = await pagesRes.json()

  return {
    paths: pages
      .filter((page) => page.slug)
      .map((page) => ({
        params: { slug: page.slug },
      })),
    fallback: true,
  }
}
