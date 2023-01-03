import { NextSeo } from 'next-seo'
import Layout from '@/components/common/Layout'
import Section from '@/components/atoms/Section'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import { HomeIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import Link from '@/components/atoms/Link'
import toCapitalize from '@/functions/toCapitalize'
import Subcategory from '@/components/organisms/Shop/Brands/Subcategory'
import Loading from '@/components/atoms/Loading'
import { useRouter } from 'next/router'

export default function Page({ brand, subcategories, subcategory, brands }) {
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
        <Section>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <h1 className='text-4xl text-red-700 font-bold mt-4 mb-12'>
            Shop {toCapitalize(brand.name)} {toCapitalize(subcategory?.name)}
          </h1>

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
                <div className='border border-zinc-100 rounded shadow'>
                  <div className='px-2 py-2 text-xl text-white bg-blue-700 font-bold'>
                    Other Brands
                  </div>

                  <div className='px-4 py-3'>
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
        </Section>
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
