import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import Link from '@/components/atoms/Link'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import toCapitalize from '@/functions/toCapitalize'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'
import Title from '@/components/molecules/Title'
import Subcategory from '@/components/organisms/Shop/Brands/Subcategory'

export default function Page({ brand, subcategories, subcategory, brands }) {
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
      text: 'Brands',
      link: '/shop/all-brands/',
    },
    {
      text: toCapitalize(brand.name),
      link: subcategory?.slug ? brand.slug : undefined,
    },
    {
      text: subcategory?.slug ? subcategory.name : undefined,
    },
  ]

  return (
    <>
      <NextSeo
        title={`${toCapitalize(brand.name)} ${
          subcategory?.name || ''
        } Prices, Deals & Current Values`}
        description={`Compare prices on ${toCapitalize(brand.name)} ${
          subcategory?.name || ''
        } to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Title className={'mt-8 mb-20'}>
            <h1>
              Shop {toCapitalize(brand.name)} {toCapitalize(subcategory?.name)}
            </h1>
          </Title>

          <div className='flex flex-col lg:flex-row gap-12'>
            <div className='w-full'>
              {subcategory?.slug ? (
                <Subcategory brandSlug={brand.slug} subcategory={subcategory} />
              ) : (
                <>
                  {subcategories?.map((subcategory, index) => (
                    <Subcategory
                      key={index}
                      brandSlug={brand.slug}
                      subcategory={subcategory}
                      collapse={true}
                    />
                  ))}
                </>
              )}
            </div>

            {!subcategory?.slug && (
              <div className='w-full lg:w-80 flex-shrink-0'>
                <div className='border border-zinc-200 rounded shadow px-4 py-5'>
                  <Title>
                    <h3>Other Brands</h3>
                  </Title>

                  <div>
                    {brands?.map((brand, index) => (
                      <Link
                        key={index}
                        href={`/shop/brands/${brand.slug}`}
                        className='block mb-2 hover:underline hover:text-red-700 font-semibold'
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    const brandSlug = params.slug[0]
    const subcategorySlug = params.slug[1]

    /**
     * Brand
     */
    const brandRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/${brandSlug}/`
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
     * Subcategories
     */
    const subcategories = []
    for (let i = 0; i < brand.subcategory.length; i++) {
      const subcategorySlug = brand.subcategory[i].slug

      const subcategoryRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subcategories/${subcategorySlug}/`
      )
      const subcategory = await subcategoryRes.json()
      subcategories.push(subcategory)
    }

    /**
     * Subcategory
     */
    const subcategoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subcategories/${subcategorySlug}/`
    )
    const subcategory = await subcategoryRes.json()

    /**
     * Other Brands
     */
    const brandsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/`
    )
    const { results: brands } = await brandsRes.json()

    return {
      props: {
        brand,
        subcategories,
        subcategory,
        brands,
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
   * All Brands
   */
  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brand-slugs/?limit=1&offset=1000`
  )
  const { results: brands } = await brandsRes.json()

  return {
    paths: brands
      .filter((brand) => brand.slug)
      .map((brand) => ({
        params: { slug: [brand.slug] },
      })),
    fallback: true,
  }
}
