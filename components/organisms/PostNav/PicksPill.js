import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import Image from '@/components/atoms/Image'
import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import { MOBILE_CTA_EVENT } from './MobileCTA'

/**
 * Mobile-only floating "See all our picks" pill. It slides up once the
 * reader has passed the first in-page CTA and opens a scrollable overlay of
 * every product CTA in the article.
 */
export default function PicksPill({ picks = [] }) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  // Render the list from the first open on, so it does not vanish while the
  // sheet slides away
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (open) setHasOpened(true)
  }, [open])

  useEffect(() => {
    const onChange = (event) => setVisible(Boolean(event.detail))
    window.addEventListener(MOBILE_CTA_EVENT, onChange)
    return () => window.removeEventListener(MOBILE_CTA_EVENT, onChange)
  }, [])

  // Lock page scroll and close on Escape while the overlay is open
  useEffect(() => {
    if (!open) return undefined

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!picks.length) return null

  return (
    <div className={'lg:hidden'}>
      <button
        type='button'
        onClick={() => setOpen(true)}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={classNames(
          'fixed z-40 left-1/2 bottom-4 -translate-x-1/2 flex flex-row items-center gap-3 rounded-full bg-white pl-2 pr-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-zinc-200 transition-all duration-300 ease-out',
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-24 opacity-0 pointer-events-none'
        )}
      >
        <span className={'flex flex-row -space-x-3'}>
          {picks.slice(0, 3).map((pick) => (
            <span
              key={pick.id}
              className={
                'relative w-10 h-10 rounded-full bg-white border border-zinc-200 overflow-hidden'
              }
            >
              <Image
                src={pick.image?.sourceUrl}
                alt=''
                fill={true}
                sizes='40px'
                className={'object-contain p-1'}
              />
            </span>
          ))}
        </span>
        <span
          className={
            'font-display font-semibold uppercase text-sm whitespace-nowrap'
          }
        >
          See all our picks
        </span>
      </button>

      <div
        className={classNames(
          'fixed inset-0 z-50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className={'absolute inset-0 bg-black/60'}
          onClick={() => setOpen(false)}
        />

        <div
          role='dialog'
          aria-modal='true'
          aria-label='Our top picks'
          className={classNames(
            'absolute left-3 right-3 bottom-3 top-16 bg-white rounded-lg shadow-xl flex flex-col transition-transform duration-300 ease-out',
            open ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div
            className={
              'flex flex-row items-center justify-between px-4 py-3 border-b'
            }
          >
            <h4>Our Top Picks</h4>
            <button
              type='button'
              onClick={() => setOpen(false)}
              aria-label='Close'
              className={
                'w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100'
              }
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>

          <ul className={'flex-grow overflow-y-auto px-4 overscroll-contain'}>
            {hasOpened &&
              picks.map((pick) => (
                <li key={pick.id} className={'py-4 border-b last:border-b-0'}>
                  <Link href={pick.link} className={'block'}>
                    <div className={'relative h-40 bg-zinc-50 mb-3'}>
                      <Image
                        src={pick.image?.sourceUrl}
                        alt={pick.image?.altText || pick.title}
                        fill={true}
                        sizes='90vw'
                        className={'object-contain p-2'}
                      />
                    </div>
                    <p className={'font-display font-semibold mb-3'}>
                      {pick.title}
                    </p>
                    <Button color={'red'} size={'full'}>
                      {pick.price
                        ? `$${pick.price} · ${pick.buttonText}`
                        : pick.buttonText}
                    </Button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
