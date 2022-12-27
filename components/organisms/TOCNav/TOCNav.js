import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import Transition from '@/components/atoms/Transition'
import Link from '@/components/atoms/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTable } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

export default function TOCNav({ toc_items }) {
  const [active, setActive] = useState(toc_items[0].id)

  useEffect(() => {
    window.addEventListener('scroll', (e) => debounce(handleScroll(e), 1000))
    return function cleanupListener() {
      window.removeEventListener('scroll', (e) => handleScroll(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const handleScroll = () => {
    let itemInView = false
    toc_items.map((toc) => {
      const el = document.getElementById(toc.id)
      if (el) {
        if (isElementVisible(el)) {
          if (!itemInView) {
            itemInView = true
            setActive(toc.id)
          }
        }
      }
    })

    function isElementVisible(el) {
      if (el) {
        const rect = el.getBoundingClientRect()
        const vWidth = window.innerWidth || document.documentElement.clientWidth
        const vHeight =
          window.innerHeight || document.documentElement.clientHeight
        const efp = (x, y) => {
          return document.elementFromPoint(x, y)
        }

        if (
          rect.right < 0 ||
          rect.bottom < 0 ||
          rect.left > vWidth ||
          rect.top > vHeight
        )
          return false

        return (
          el.contains(efp(rect.left, rect.top)) ||
          el.contains(efp(rect.right, rect.top))
        )
      }

      return false
    }
  }

  function closeTOCMenu() {
    const tocMenu = document.getElementsByClassName('toc_button')[0]
    tocMenu.click()
  }

  return (
    <>
      <div className={'sticky top-8 mb-20'}>
        <div className='hidden md:block md:w-72 bg-zinc-100 border-t-4 border-red-700'>
          <div
            className={
              'px-4 py-5 border-b border-red-400 flex flex-row items-center gap-2'
            }
          >
            <FontAwesomeIcon icon={faTable} className={'text-red-700'} />
            <h6 className={'uppercase font-medium text-red-700'}>
              Table of Contents
            </h6>
          </div>

          {toc_items.map(({ label, id }, index) => (
            <div key={index} className={'flex border-b border-zinc-200'}>
              <Link
                href={`#${id}`}
                className={classNames(
                  active === id &&
                    'bg-gradient-to-r from-red-900 to-red-600 text-white',
                  'w-full px-4 py-3 text-lg font-light tracking-wider'
                )}
              >
                {`${index + 1}. ${label}`}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='block md:hidden w-full sticky top-0 bg-zinc-100 z-30'>
        {toc_items?.length > 0 ? (
          <Popover>
            <Popover.Button className='toc_button group uppercase inline-flex items-center hover:text-blue-900 font-bold w-full border rounded px-4 py-2 text-center justify-between'>
              <span>{toc_items.find((item) => item.id === active)?.label}</span>

              <FontAwesomeIcon icon={faChevronDown} />
            </Popover.Button>

            <Transition>
              <Popover.Panel
                className='absolute z-30 px-4 py-2 w-full bg-zinc-100 shadow'
                onClick={() => closeTOCMenu()}
              >
                {toc_items.map(({ label, id }) => (
                  <Link
                    key={label}
                    href={`#${id}`}
                    type='tertiary'
                    className='block mb-2 font-semibold'
                  >
                    {label}
                  </Link>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
