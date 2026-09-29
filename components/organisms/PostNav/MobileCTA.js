import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Image from '@/components/atoms/Image'

export const MOBILE_CTA_EVENT = 'af:mobile-cta'

/**
 * Mobile-only sticky CTA bar. Once the reader scrolls past an in-page CTA the
 * bar slides down with that product and stays until the next CTA is passed,
 * at which point it switches to that one.
 *
 * While it is showing, `data-mobile-cta="on"` is set on <html> (the site
 * header slides out on mobile, see main.scss) and MOBILE_CTA_EVENT is fired
 * for the floating picks pill.
 */
export default function MobileCTA({ picks = [] }) {
  const barRef = useRef(null)
  const [current, setCurrent] = useState(null)
  // Last product shown, kept so the bar can slide out with content in it
  const [shown, setShown] = useState(null)
  const pickKey = picks.map((pick) => pick.id).join('|')

  useEffect(() => {
    if (!picks.length) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      // A CTA counts as passed once it scrolls under the full sticky stack
      // (header + section nav). Use their heights rather than current
      // positions: the stack moves up when the header slides out, and a
      // moving line would toggle the header back and forth.
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-h'
          )
        ) || 0
      const navHeight =
        barRef.current?.previousElementSibling?.offsetHeight ?? 0
      const boundary = headerHeight + navHeight
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

  useEffect(() => {
    if (current) setShown(current)

    const root = document.documentElement
    if (current) {
      root.dataset.mobileCta = 'on'
    } else {
      delete root.dataset.mobileCta
    }
    window.dispatchEvent(
      new CustomEvent(MOBILE_CTA_EVENT, { detail: Boolean(current) })
    )
  }, [current])

  useEffect(
    () => () => {
      delete document.documentElement.dataset.mobileCta
      window.dispatchEvent(new CustomEvent(MOBILE_CTA_EVENT, { detail: false }))
    },
    []
  )

  const pick = current ?? shown

  return (
    <div
      ref={barRef}
      className={classNames(
        'lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out',
        current ? 'max-h-24' : 'max-h-0'
      )}
      aria-hidden={!current}
    >
      <div
        className={classNames(
          'bg-white border-b shadow transition-transform duration-300 ease-out',
          current ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {pick && (
          <a
            href={pick.link}
            target='_blank'
            rel='noreferrer'
            tabIndex={current ? 0 : -1}
            className={'flex flex-row items-center gap-3 px-4 py-2'}
          >
            <div className={'relative w-12 h-12 shrink-0 bg-white'}>
              <Image
                src={pick.image?.sourceUrl}
                alt={pick.image?.altText || pick.title}
                fill={true}
                sizes='48px'
                className={'object-contain'}
              />
            </div>

            <p
              className={
                'min-w-0 flex-grow font-display font-semibold truncate'
              }
            >
              {pick.title}
            </p>

            {pick.price && (
              <span
                className={
                  'shrink-0 bg-red-700 text-white font-display font-semibold px-3 py-1.5'
                }
              >
                {`$${pick.price}`}
              </span>
            )}
          </a>
        )}
      </div>
    </div>
  )
}
