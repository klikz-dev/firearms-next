import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Image from '@/components/atoms/Image'

/**
 * Mobile-only sticky CTA bar. Once the reader scrolls past an in-page CTA the
 * bar slides in with that product and stays until the next CTA is passed, at
 * which point it switches to that one.
 */
export default function MobileCTA({ picks = [] }) {
  const barRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const pickKey = picks.map((pick) => pick.id).join('|')

  useEffect(() => {
    if (!picks.length) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      const boundary = barRef.current?.getBoundingClientRect().top ?? 0
      let found = null

      for (const pick of picks) {
        const el = document.getElementById(pick.id)
        if (!el) continue
        if (el.getBoundingClientRect().bottom <= boundary) {
          found = pick
        } else {
          break
        }
      }

      setCurrent((prev) => (prev?.id === found?.id ? prev : found))
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickKey])

  return (
    <div
      ref={barRef}
      className={classNames(
        'lg:hidden overflow-hidden bg-white transition-all duration-300 ease-out',
        current ? 'max-h-24 border-b shadow' : 'max-h-0'
      )}
      aria-hidden={!current}
    >
      {current && (
        <a
          href={current.link}
          target='_blank'
          rel='noreferrer'
          className={'flex flex-row items-center gap-3 px-4 py-2'}
        >
          <div className={'relative w-12 h-12 shrink-0 bg-white'}>
            <Image
              src={current.image?.sourceUrl}
              alt={current.image?.altText ?? current.title}
              fill={true}
              sizes='48px'
              className={'object-contain'}
            />
          </div>

          <p
            className={'min-w-0 flex-grow font-display font-semibold truncate'}
          >
            {current.title}
          </p>

          {current.price && (
            <span
              className={
                'shrink-0 bg-red-700 text-white font-display font-semibold px-3 py-1.5'
              }
            >
              {`$${current.price}`}
            </span>
          )}
        </a>
      )}
    </div>
  )
}
