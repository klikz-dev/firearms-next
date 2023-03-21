import Layout from '@/components/common/Layout'
import { NextSeo } from 'next-seo'
import Link from '@/components/atoms/Link'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/molecules/Breadcrumbs'
import { createRef, useRef } from 'react'
import { alphabets } from '@/const/setting/shop'
import isCharacter from '@/functions/isCharacter'
import Title from '@/components/molecules/Title'

export default function Page({ brands }) {
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
    },
  ]

  const alphabetRefs = useRef([])
  alphabetRefs.current = alphabets.map(
    (alphabet, index) => (alphabetRefs.current[index] = createRef())
  )

  const handleScroll = (index) => {
    alphabetRefs.current[index].current.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    })
  }

  return (
    <>
      <NextSeo
        title={`Shop All Brands`}
        description={`Compare prices on guns & accessories to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Title>
            <h1>Shop All Brands</h1>
          </Title>

          <div className='px-4 py-2 shadow bg-zinc-200 md:sticky md:top-0 flex flex-row flex-wrap gap-4 mb-16'>
            {alphabets.map((alphabet, index) => (
              <span
                key={index}
                onClick={() => handleScroll(index)}
                className='text-2xl text-red-700 hover:text-red-900 hover:underline font-bold cursor-pointer'
              >
                {alphabet}
              </span>
            ))}
          </div>

          <div className=''>
            {alphabets.map((alphabet, index) => (
              <div key={index} ref={alphabetRefs.current[index]}>
                <p className='bg-zinc-300 px-4 py-2 rounded text-2xl font-semibold mb-4'>
                  {alphabet}
                </p>

                <div className='px-4 py-2 grid md:grid-cols-2 lg:grid-cols-4 gap-1 mb-12'>
                  {brands
                    .filter(
                      (brand) =>
                        brand.name !== '' &&
                        (brand.name[0].toUpperCase() === alphabet ||
                          (!isCharacter(alphabet) &&
                            !isCharacter(brand.name[0])))
                    )
                    .map((brand, index) => (
                      <Link
                        key={index}
                        href={`/shop/brands/${brand.slug}/`}
                        className='hover:underline hover:text-red-700'
                      >
                        {brand.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  /**
   * All Brands
   */
  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brands/?limit=9999&offset=0`
  )
  const { results: brands } = await brandsRes.json()

  return {
    props: {
      brands,
    },
    revalidate: 100,
  }
}
