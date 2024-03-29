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

export default function Page({ categories }) {
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
      text: 'Categories',
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
        title={`Shop All Categories`}
        description={`Compare prices on guns & accessories to find the best deals before buying.`}
      />

      <Layout>
        <Container className={`py-12`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Title>
            <h1>Shop All Categories</h1>
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
                  {categories
                    .filter(
                      (category) =>
                        category.name !== '' &&
                        (category.name[0].toUpperCase() === alphabet ||
                          (!isCharacter(alphabet) &&
                            !isCharacter(category.name[0])))
                    )
                    .map((category, index) => (
                      <Link
                        key={index}
                        href={`/shop/categories/${category.slug}/`}
                        className='hover:underline hover:text-red-700'
                      >
                        {category.name}
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
   * All Categories
   */
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/?limit=9999&offset=0`
  )
  const { results: categories } = await categoriesRes.json()

  return {
    props: {
      categories,
    },
    revalidate: 100,
  }
}
