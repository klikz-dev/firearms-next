import Image from '@/components/atoms/Image'
import Title from '@/components/molecules/Title'
import { useQuery } from '@apollo/client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useState } from 'react'
import Category from './Category'
import Subscribe from './Subscribe'
import GET_POSTS_QUERY from '@/const/schema/getPosts.graphql'

export default function Sidebar() {
  /**
   * Category - Reviews
   */
  const { data: reviews } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      category: 'reviews',
    },
  })

  /**
   * Category - News
   */
  const { data: news } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      category: 'news',
    },
  })

  /**
   * Tag - Comparison
   */
  const { data: comparison } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      tag: 'comparison',
    },
  })

  /**
   * Tag - Ammo
   */
  const { data: ammo } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      tag: 'ammo',
    },
  })

  /**
   * Category - Guides
   */
  const { data: guides } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      category: 'guides',
    },
  })

  /**
   * Tag - Accessories
   */
  const { data: accessories } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      tag: 'accessories',
    },
  })

  /**
   * Category - Gun Safes
   */
  const { data: gunSafes } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      category: 'gun-safes',
    },
  })

  /**
   * Category - Scopes Optics
   */
  const { data: scopesOptics } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      category: 'scopes-optics',
    },
  })

  /**
   * Tag - Holsters Carry
   */
  const { data: holstersCarry } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: 3,
      tag: 'holsters-carry',
    },
  })

  const [active, setActive] = useState('')

  const categories = [
    {
      icon: '/images/category-icon-reviews.png',
      name: 'In-Hand Reviews',
      posts: reviews?.posts.nodes,
      link: '/category/reviews',
    },
    {
      icon: '/images/category-icon-news.png',
      name: 'Firearm News',
      posts: news?.posts.nodes,
      link: '/category/news',
    },
    {
      icon: '/images/category-icon-comparisons.png',
      name: 'Featured Comparisons',
      posts: comparison?.posts.nodes,
      link: '/tag/comparison',
    },
    {
      icon: '/images/category-icon-ammo.png',
      name: 'Firearm & Ammo Reviews',
      posts: ammo?.posts.nodes,
      link: '/tag/ammo',
    },
    {
      icon: '/images/category-icon-guides.png',
      name: 'Popular Guides & Stats',
      posts: guides?.posts.nodes,
      link: '/category/guides',
    },
    {
      icon: '/images/category-icon-gear.png',
      name: 'Range Gear & Accessories',
      posts: accessories?.posts.nodes,
      link: '/tag/accessories',
    },
    {
      icon: '/images/category-icon-gun.png',
      name: 'Gun & Ammo Safes',
      posts: gunSafes?.posts.nodes,
      link: '/category/gun-safes',
    },
    {
      icon: '/images/category-icon-scopes.png',
      name: 'Scopes & Optics',
      posts: scopesOptics?.posts.nodes,
      link: '/category/scopes-optics',
    },
    {
      icon: '/images/category-icon-holsters.png',
      name: 'Holsters & Concealed Carry',
      posts: holstersCarry?.posts.nodes,
      link: '/tag/holsters-carry',
    },
  ]

  return (
    <div className={'mb-8 lg:mb-20'}>
      <div className={'hidden lg:block'}>
        <Subscribe />
      </div>

      <Title>
        <h3>View by Category</h3>
      </Title>

      {categories?.map((category, index) => (
        <div key={index} className={'mb-3'}>
          <div
            onClick={() =>
              setActive(active === category.link ? '' : category.link)
            }
            className={classNames(
              'p-4 flex flex-row justify-between items-center gap-3 cursor-pointer',
              active === category.link ? 'bg-zinc-200' : 'bg-zinc-200/50'
            )}
          >
            <div className={'flex flex-row items-center gap-2'}>
              <Image
                src={category.icon}
                width={20}
                height={20}
                alt={category.name}
              />
              <h5>{category.name}</h5>
            </div>

            {active === category.link ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>

          <div
            className={classNames(
              active === category.link ? 'bg-zinc-200' : 'hidden'
            )}
          >
            <Category posts={category.posts} link={category.link} />
          </div>
        </div>
      ))}
    </div>
  )
}
