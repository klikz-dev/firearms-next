import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faChevronDown,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import Container from '@/components/atoms/Container'
import MobileCTA from './MobileCTA'

/**
 * Sticky bar under the site header on post pages. Collapsed it shows the
 * heading of the section being read; expanded it lists jump links to every
 * section. On mobile it also hosts the sticky CTA bar.
 */
export default function PostNav({ sections = [], picks = [] }) {
  const wrapperRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const sectionKey = sections.map((section) => section.id).join('|')

  // Publish the bar height so anchors scroll clear of it (see main.scss).
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined

    const root = document.documentElement
    const update = () =>
      root.style.setProperty('--subnav-h', `${el.offsetHeight}px`)

    update()
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    observer?.observe(el)

    return () => {
      observer?.disconnect()
      root.style.setProperty('--subnav-h', '0px')
    }
  }, [])

  // Track which section the reader is in.
  useEffect(() => {
    if (!sections.length) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      const boundary =
        (wrapperRef.current?.getBoundingClientRect().bottom ?? 0) + 24
      let current = ''

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= boundary) {
          current = section.id
        } else {
          break
        }
      }

      setActiveId(current)
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
  }, [sectionKey])

  if (!sections.length && !picks.length) return null

  const active = sections.find((section) => section.id === activeId)

  return (
    <div
      ref={wrapperRef}
      className={'sticky z-30'}
      style={{ top: 'var(--header-h, 0px)' }}
    >
      {sections.length > 0 && (
        <div className={'relative bg-white border-b shadow-sm'}>
          <Container>
            <div
              className={
                'flex flex-row items-center justify-between gap-4 py-2'
              }
            >
              <button
                type='button'
                onClick={() => setOpen(!open)}
                className={
                  'min-w-0 flex-grow text-left flex flex-row items-center gap-3'
                }
                aria-expanded={open}
                aria-controls='post-nav-sections'
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className={'lg:hidden text-red-700 shrink-0'}
                />

                <span className={'min-w-0'}>
                  <span
                    className={
                      'hidden lg:block text-[10px] uppercase tracking-widest text-zinc-500 leading-none mb-1'
                    }
                  >
                    {active ? 'You are reading' : 'Browse'}
                  </span>
                  <span
                    className={
                      'block font-display font-semibold uppercase truncate'
                    }
                  >
                    {active?.label ?? 'Sections of this article'}
                  </span>
                </span>
              </button>

              <button
                type='button'
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close section list' : 'Open section list'}
                className={
                  'w-8 h-8 shrink-0 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-700'
                }
              >
                <FontAwesomeIcon icon={open ? faClose : faChevronDown} />
              </button>
            </div>
          </Container>

          <div
            id='post-nav-sections'
            hidden={!open}
            className={
              'absolute left-0 right-0 top-full bg-white border-b shadow-lg max-h-[70vh] overflow-y-auto'
            }
          >
            <Container>
              <ul className={'py-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8'}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      className={classNames(
                        'block py-2 border-b border-zinc-100 hover:text-red-700',
                        section.id === activeId && 'text-red-700 font-semibold'
                      )}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
        </div>
      )}

      <MobileCTA picks={picks} />
    </div>
  )
}
