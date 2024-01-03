import Image from '@/components/atoms/Image'
import Title from '@/components/molecules/Title'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useState } from 'react'
import Category from './Category'
import Subscribe from './Subscribe'
import HTMLContent from '@/components/atoms/HTMLContent'

export default function Sidebar({ alert, data }) {
  const {
    reviews,
    news,
    comparison,
    ammo,
    guides,
    accessories,
    gunSafes,
    scopesOptics,
    holstersCarry,
  } = data

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
      {alert?.display && (
        <div className={'p-4 bg-zinc-200/60 mb-12 relative'}>
          <div className={'absolute right-5 top-4'}>
            <Image
              src={'/images/bell.png'}
              width={38}
              height={45}
              alt={'Bell'}
            />
          </div>

          <Title className={'mb-4'}>
            <h4>{alert?.title}</h4>
          </Title>

          <HTMLContent>{alert?.alert}</HTMLContent>
        </div>
      )}

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
