import { useEffect, useState } from 'react'
import moment from 'moment'
import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Slider from '@/components/molecules/Slider'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getSlidesPerView() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}

/**
 * Closing "Further Reading" carousel: posts from the same category as the
 * page. Three per view on desktop, one per view with swipe on mobile.
 */
export default function FurtherReading({ posts = [], category }) {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const update = () => setPerView(getSlidesPerView())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!posts.length) return null

  const maxIndex = Math.max(0, posts.length - perView)
  const safeCurrent = Math.min(current, maxIndex)
  const prev = () => setCurrent(Math.max(0, safeCurrent - perView))
  const next = () => setCurrent(Math.min(maxIndex, safeCurrent + perView))

  const slides = posts.map((post) => (
    <Link key={post.slug} href={`/${post.slug}/`} className={'group block'}>
      <div
        className={'relative aspect-[16/10] w-full overflow-hidden bg-zinc-100'}
      >
        <Image
          src={post.featuredImage?.node?.sourceUrl}
          alt={post.featuredImage?.node?.altText || post.title}
          fill={true}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          className={
            'object-cover transition-transform duration-300 group-hover:scale-105'
          }
        />
      </div>

      <p
        className={
          'text-[11px] uppercase tracking-wider text-red-700 font-semibold mt-3 mb-1'
        }
      >
        {moment(post.date).format('MMMM DD, YYYY')}
      </p>

      <h4 className={'line-clamp-3 group-hover:text-red-700'}>{post.title}</h4>
    </Link>
  ))

  return (
    <section
      id='further-reading'
      data-section='Further Reading'
      className={'mb-12'}
    >
      <div className={'flex flex-row items-end justify-between gap-4 mb-6'}>
        <div className={'min-w-0'}>
          {category && (
            <p
              className={
                'text-xs uppercase tracking-wider text-red-700 font-semibold mb-1'
              }
            >
              {category}
            </p>
          )}
          <h2>Further Reading</h2>
        </div>

        {posts.length > perView && (
          <div className={'flex flex-row gap-2 shrink-0'}>
            <Button
              color='black'
              size='icon'
              onClick={prev}
              disabled={safeCurrent === 0}
              aria-label='Previous articles'
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>

            <Button
              color='black'
              size='icon'
              onClick={next}
              disabled={safeCurrent >= maxIndex}
              aria-label='Next articles'
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        )}
      </div>

      <Slider
        currentSlide={safeCurrent}
        slidesPerView={perView}
        slides={slides}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
